import { Action } from '../state/actions';
import { ProjectSelection } from '../../server/server-response-types';

export interface Project {
    root?: string;
    name?: string;
}

const ACTION_SWITCH_PROJECT = 'Project.Switch';
interface SwitchProjectAction extends Action {
    root: string;
    name: string;
}

export function projectReducer(state: Project = {}, action: Action): Project {
    let newState = state;
    switch (action.type) {
        case ACTION_SWITCH_PROJECT:
            newState = _switchProject(state, action as SwitchProjectAction);
            break;
    }

    return newState;
}

/**
 * Create a function that can be used to switch what project is open.
 * @param  project The project being opened
 * @return An action that can be dispatched to switch the project.
 */
export function switchProjectAction(project: ProjectSelection): SwitchProjectAction {
    return {
        type: ACTION_SWITCH_PROJECT,
        root: project.root,
        name: project.name
    };
}

function _switchProject(project: Project, action: SwitchProjectAction): Project {
    return {
        ...project,
        root: action.root,
        name: action.name
    };
}
