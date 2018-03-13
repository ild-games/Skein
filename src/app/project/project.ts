import { Action } from '../state/actions';

export interface Project {
    home?: string;
}

const ACTION_SWITCH_PROJECT = 'Project.Switch';
interface SwitchProjectAction extends Action {
    home: string;
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
 * @param  home The home path of the project.
 * @return An action that can be dispatched to switch the project.
 */
export function switchProjectAction(home: string): SwitchProjectAction {
    return {
        type: ACTION_SWITCH_PROJECT,
        home
    };
}

function _switchProject(project: Project, action: SwitchProjectAction): Project {
    return {
        ...project,
        home: action.home,
    };
}
