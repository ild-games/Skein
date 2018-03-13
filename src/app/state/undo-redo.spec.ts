import { createStore, Store } from 'redux';

import {
    createUndoRedoReducer,
    undoAction,
    clearUndoHistoryAction,
    redoAction,
    newMergeKey,
    undoKeyCombination,
    redoKeyCombination
} from './undo-redo';
import { testReducer, testAction } from './store.service.spec';
import { SkeinKeyEvent } from '../util/keyboard-multiplexer';

// Undo-redo test redux helpers
export function getState(store: any): any {
    let state = store.getState();
    return state ? state.state : null;
}

describe('undo-redo', function () {
    let store: Store<any>;
    beforeEach(function () {
        let reducer = createUndoRedoReducer(testReducer);
        store = createStore(reducer);
    });

    describe('getCurrentState', function () {
        it('returns the default state on a new store', function () {
            expect(getState(store).isDefaultState).toEqual(true);
        });

        it('returns the current state after it is updated', function () {
            store.dispatch(testAction({ isNewState: true }));
            expect(getState(store).isNewState).toEqual(true);
        });
    });

    describe('undo', function () {
        it('does not wipe out the initial state', function () {
            store.dispatch(undoAction());
            expect(getState(store).isDefaultState).toEqual(true);
        });

        it('can return the state to the intial state', function () {
            store.dispatch(testAction({ isNewState: true }));
            store.dispatch(undoAction());
            expect(getState(store).isDefaultState).toEqual(true);
        });

        it('can be called multiple times to return you to the a previous state', function () {
            store.dispatch(testAction({ update: 1 }));
            store.dispatch(testAction({ update: 2 }));
            store.dispatch(testAction({ update: 3 }));
            store.dispatch(testAction({ update: 4 }));

            store.dispatch(undoAction());
            store.dispatch(undoAction());

            expect(getState(store).update).toEqual(2);
        });
    });

    describe('clear', function () {
        it('removes the undo stack', function () {
            store.dispatch(testAction({ update: 1 }));
            store.dispatch(testAction({ update: 2 }));

            store.dispatch(clearUndoHistoryAction());
            store.dispatch(undoAction());

            expect(getState(store).update).toEqual(2);
        });

        it('removes the redo stack', function () {
            store.dispatch(testAction({ update: 1 }));
            store.dispatch(testAction({ update: 2 }));

            store.dispatch(undoAction());
            store.dispatch(clearUndoHistoryAction());
            store.dispatch(redoAction());

            expect(getState(store).update).toEqual(1);
        });
    });


    describe('redo', function () {
        it('does nothing to the initial state', function () {
            store.dispatch(redoAction());
            expect(getState(store).isDefaultState).toEqual(true);
        });

        it('does nothing if no actions were undone', function () {
            store.dispatch(testAction({ update: 1 }));
            store.dispatch(redoAction());
            expect(getState(store).update).toEqual(1);
        });

        it('redoes a single undo', function () {
            store.dispatch(testAction({ update: 1 }));
            store.dispatch(undoAction());
            store.dispatch(redoAction());
            expect(getState(store).update).toEqual(1);
        });

        it('can redo multiple undos', function () {
            store.dispatch(testAction({ update: 1 }));
            store.dispatch(testAction({ update: 2 }));
            store.dispatch(testAction({ update: 3 }));

            store.dispatch(undoAction());
            store.dispatch(undoAction());
            store.dispatch(undoAction());

            store.dispatch(redoAction());
            store.dispatch(redoAction());

            expect(getState(store).update).toEqual(2);
        });
    });

    describe('mergeKey', function () {
        it('unique merge keys do not merge', function () {
            store.dispatch(testAction({ update: 1 }, newMergeKey()));
            store.dispatch(testAction({ update: 2 }, newMergeKey()));

            store.dispatch(undoAction());

            expect(getState(store).update).toEqual(1);
        });

        it('identical merge keys do merge', function () {
            store.dispatch(testAction({ update: 1 }, newMergeKey()));
            let mergeKey = newMergeKey();
            store.dispatch(testAction({ update: 2 }, mergeKey));
            store.dispatch(testAction({ update: 3 }, mergeKey));
            store.dispatch(testAction({ update: 4 }, newMergeKey()));

            store.dispatch(undoAction());
            store.dispatch(undoAction());

            expect(getState(store).update).toEqual(1);
        });

        it('merges redo operations', function () {
            store.dispatch(testAction({ update: 1 }, newMergeKey()));
            let mergeKey = newMergeKey();
            store.dispatch(testAction({ update: 2 }, mergeKey));
            store.dispatch(testAction({ update: 3 }, mergeKey));
            store.dispatch(testAction({ update: 4 }, newMergeKey()));

            store.dispatch(undoAction());
            store.dispatch(undoAction());

            store.dispatch(redoAction());

            expect(getState(store).update).toEqual(3);
        });

        it('is ignored after a redo', function () {
            store.dispatch(testAction({ update: 1 }, newMergeKey()));
            let mergeKey = newMergeKey();
            store.dispatch(testAction({ update: 2 }, mergeKey));
            store.dispatch(testAction({ update: 3 }, mergeKey));

            store.dispatch(undoAction());
            store.dispatch(redoAction());

            store.dispatch(testAction({ update: 4 }, mergeKey));

            store.dispatch(undoAction());

            expect(getState(store).update).toEqual(3);
        });
    });

    describe('keyCombinations', function () {
        it('identifies non macOS undo key combinations', function () {
            let undoEvent: SkeinKeyEvent = {
                rawEvent: document.createEvent("KeyboardEvent") as KeyboardEvent,
                key: 'z',
                ctrlKey: true,
                shiftKey: false,
                metaKey: false
            };
            expect(undoKeyCombination(undoEvent)).toBe(true);
            let redoEvent: SkeinKeyEvent = {
                rawEvent: document.createEvent("KeyboardEvent") as KeyboardEvent,
                key: 'z',
                ctrlKey: true,
                shiftKey: true,
                metaKey: false
            };
            expect(undoKeyCombination(redoEvent)).toBe(false);
            let differentEvent: SkeinKeyEvent = {
                rawEvent: document.createEvent("KeyboardEvent") as KeyboardEvent,
                key: 'z',
                ctrlKey: false,
                shiftKey: true,
                metaKey: false
            };
            expect(undoKeyCombination(differentEvent)).toBe(false);
            differentEvent = {
                rawEvent: document.createEvent("KeyboardEvent") as KeyboardEvent,
                key: 'y',
                ctrlKey: false,
                shiftKey: true,
                metaKey: true
            };
            expect(undoKeyCombination(differentEvent)).toBe(false);
        });

        it('identifies macOS undo key combinations', function () {
            let undoEvent: SkeinKeyEvent = {
                rawEvent: document.createEvent("KeyboardEvent") as KeyboardEvent,
                key: 'z',
                ctrlKey: false,
                shiftKey: false,
                metaKey: true
            };
            expect(undoKeyCombination(undoEvent)).toBe(true);
        });

        it('identifies non macOS redo key combinations', function () {
            let redoEvent: SkeinKeyEvent = {
                rawEvent: document.createEvent("KeyboardEvent") as KeyboardEvent,
                key: 'z',
                ctrlKey: true,
                shiftKey: true,
                metaKey: false
            };
            expect(redoKeyCombination(redoEvent)).toBe(true);
            let undoEvent: SkeinKeyEvent = {
                rawEvent: document.createEvent("KeyboardEvent") as KeyboardEvent,
                key: 'z',
                ctrlKey: true,
                shiftKey: false,
                metaKey: false
            };
            expect(redoKeyCombination(undoEvent)).toBe(false);
            let differentEvent: SkeinKeyEvent = {
                rawEvent: document.createEvent("KeyboardEvent") as KeyboardEvent,
                key: 'z',
                ctrlKey: false,
                shiftKey: true,
                metaKey: false
            };
            expect(redoKeyCombination(differentEvent)).toBe(false);
            differentEvent = {
                rawEvent: document.createEvent("KeyboardEvent") as KeyboardEvent,
                key: 'y',
                ctrlKey: false,
                shiftKey: true,
                metaKey: false
            };
            expect(redoKeyCombination(differentEvent)).toBe(false);
        });

        it('identifies macOS redo key combinations', function () {
            let redoEvent: SkeinKeyEvent = {
                rawEvent: document.createEvent("KeyboardEvent") as KeyboardEvent,
                key: 'z',
                ctrlKey: true,
                shiftKey: true,
                metaKey: false
            };
            expect(redoKeyCombination(redoEvent)).toBe(true);
        });
    });
});
