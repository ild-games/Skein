import { TestBed, async } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { StoreService } from './store.service';
import { Action } from './actions';
import { newMergeKey } from './undo-redo';

// test reducer and action for the store
const TEST_ACTION = 'Test.Action';
interface TestAction extends Action {
    state: any;
}
export function testAction(state: any, mergeKey?: any): TestAction {
    return {
        state, mergeKey, type: TEST_ACTION
    };
}
export function testReducer(state: any = { isDefaultState: true }, action: TestAction): any {
    switch (action.type) {
        case TEST_ACTION:
            return action.state;
    }
    return state;
}

describe('StoreService', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
            ],
            providers: [
                { provide: StoreService, useValue: new StoreService(testReducer) },
            ]
        }).compileComponents();
    }));

    it('should dispatch an action that will affect the state', async(() => {
        let storeService = TestBed.get(StoreService) as StoreService;
        expect(storeService.getState().isDefaultState).toBe(true);
        let testState = { isNewState: true };
        storeService.dispatch(testAction(testState));
        expect(storeService.getState()).toBe(testState);
    }));

    it('should combine actions for undo/redo when using the same merge key', async(() => {
        let storeService = TestBed.get(StoreService) as StoreService;
        expect(storeService.getState().isDefaultState).toBe(true);
        let mergeKey = newMergeKey();
        storeService.dispatch(testAction({ isNewState: true }), mergeKey);
        storeService.dispatch(testAction({ isNewState: false }), mergeKey);
        storeService.undo();
        expect(storeService.getState().isDefaultState).toBe(true);
        storeService.redo();
        expect(storeService.getState().isNewState).toBe(false);
    }));
});
