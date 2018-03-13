import { List } from 'immutable';

import { Action } from './actions';
import { Reducer, Store } from 'redux';
import { SkeinKeyEvent } from '../util/keyboard-multiplexer';

export const UNDO_ACTION = 'UndoRedo.Undo';
export const REDO_ACTION = 'UndoRedo.Redo';
export const CLEAR_HISTORY_ACTION = 'UndoRedo.Clear';

export type MergeKey = number;
let key = 1;

export function newMergeKey(): MergeKey {
    return key++;
}

export function undoAction(): Action {
    return {
        type: UNDO_ACTION
    };
}

export function redoAction(): Action {
    return {
        type: REDO_ACTION
    };
}

export function clearUndoHistoryAction(): Action {
    return {
        type: CLEAR_HISTORY_ACTION
    };
}

export interface UndoRedoState<T> {
    stateHistory: List<T>;
    undoHistory?: List<T>;
    lastAction?: Action;
    state?: T;
}

export function createUndoRedoReducer<T>(rootReducer: Reducer<T>): Reducer<UndoRedoState<T>> {
    return function (state: UndoRedoState<T>, action: Action): UndoRedoState<T> {
        state = state || _initialState(rootReducer);

        switch (action.type) {
            case UNDO_ACTION:
                return _undo(state);
            case REDO_ACTION:
                return _redo(state);
            case CLEAR_HISTORY_ACTION:
                return _clear(state);
            default:
                return _applyReducer<T>(rootReducer, state, action);
        }
    };
}

export function undoKeyCombination(event: SkeinKeyEvent): boolean {
    return (
        (event.ctrlKey || event.metaKey) &&
        !event.shiftKey &&
        event.key === 'z'
    );
}

export function redoKeyCombination(event: SkeinKeyEvent): boolean {
    return (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key === 'z'
    );
}

function _initialState<T>(rootReducer: Reducer<T>): UndoRedoState<T> {
    return {
        stateHistory: List<T>(),
        state: rootReducer(undefined, { type: '' })
    };
}

function _undo<T>(state: UndoRedoState<T>): UndoRedoState<T> {
    if (!state.stateHistory.isEmpty()) {
        let undoHistory: List<any> = state.undoHistory ? state.undoHistory : List();
        let nextState = state.stateHistory.last();
        return {
            stateHistory: state.stateHistory.pop(),
            undoHistory: undoHistory.push(state.state),
            state: nextState
        };
    } else {
        return state;
    }
}

function _redo<T>(state: UndoRedoState<T>): UndoRedoState<T> {
    if (state.undoHistory && !state.undoHistory.isEmpty()) {
        return {
            stateHistory: state.stateHistory.push(state.state),
            undoHistory: state.undoHistory.pop(),
            state: state.undoHistory.last()
        };
    } else {
        return state;
    }
}

function _clear<T>(state: UndoRedoState<T>): UndoRedoState<T> {
    return {
        stateHistory: List<T>(),
        state: state.state
    };
}

function _applyReducer<T>(
    rootReducer: Reducer<T>,
    state: UndoRedoState<T>,
    action: Action): UndoRedoState<T> {

    let baseState = state;
    if (_shouldMerge(action, state.lastAction)) {
        baseState = _undo(state);
    }

    return {
        stateHistory: baseState.stateHistory.push(baseState.state),
        state: rootReducer(state.state, action),
        lastAction: action
    };
}

function _shouldMerge(action: Action, prevAction: Action) {
    if (!action || !prevAction) {
        return false;
    }

    if (action.mergeKey || prevAction.mergeKey) {
        return action.mergeKey === prevAction.mergeKey;
    }

    return false;
}
