import { dialog, BrowserWindow } from 'electron';
import { Response, Request } from 'express';

import { ISpoolServer } from '../server/spool-server';
import { NewProjectResponse, OpenProjectResponse } from '../server/server-response-types';
import { OpenProjectRequest } from '../server/server-requests-types';

export class ElectronSpoolServer implements ISpoolServer {

    constructor(private _mainWindow: BrowserWindow) {
    }

    /**
     * @returns the project key is the directory of the project on the electron client
     */
    public newProject(): NewProjectResponse {
        const selectedProject = dialog.showOpenDialog(this._mainWindow, { properties: ['openDirectory', 'createDirectory'] });
        if (!selectedProject || selectedProject.length === 0) {
            return { newProjectKey: null };
        }

        return { newProjectKey: selectedProject[0] };
    }

    public openProject(request: OpenProjectRequest): OpenProjectResponse {
        const projectDirectory = request.projectKeyToOpen;
        return {
            message: 'ok I\'ll try to open it'
        };
    }
}
