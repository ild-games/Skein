import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store, Reducer, createStore } from 'redux';

import { UndoRedoState, createUndoRedoReducer, undoAction, redoAction } from './undo-redo';
import { Action } from './actions';
import { SkeinState } from './skein-state';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class StoreService {
    private _store: Store<UndoRedoState<any>>;
    private _state: BehaviorSubject<SkeinState>;

    constructor(reducer: Reducer<any>) {
        this._store = createStore(createUndoRedoReducer(reducer));
        this._state = new BehaviorSubject(this.getState());
        this._store.subscribe(() => {
            this._state.next(this.getState());
        });
    }

    public subscribe(next: (val: SkeinState) => void): Subscription {
        return this._state.subscribe(next);
    }

    public dispatch(action: Action, mergeKey?: any) {
        if (mergeKey) {
            action.mergeKey = mergeKey;
        }
        this._store.dispatch(action);
    }

    public getState() {
        return this._store.getState().state;
    }

    public undo() {
        this.dispatch(undoAction());
    }

    public redo() {
        this.dispatch(redoAction());
    }
}
