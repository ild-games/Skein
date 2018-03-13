import { Action } from './state/actions';
import { projectReducer } from './project/project';
import { SkeinState } from './state/skein-state';

export function mainReducer(state: any = {}, action: Action): SkeinState {
    return {
        project: projectReducer(state.project, action),
    };
}
