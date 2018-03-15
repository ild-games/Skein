import { dialog, BrowserWindow } from 'electron';
import { Response, Request } from 'express';

import { ISkeinServer } from '../server/skein-server';
import { NewProjectResponse, OpenProjectResponse, RecentProjectsResponse } from '../server/server-response-types';
import { OpenProjectRequest } from '../server/server-requests-types';
import { normalize as pathNormalize, join as pathJoin, home as pathHome } from './util/path';
import { getDataFromFilePath } from './util/file-loader';

export class ElectronSkeinServer implements ISkeinServer {

    constructor(private _mainWindow: BrowserWindow) {
    }

    /**
     * @returns the project key is the directory of the project on the electron client
     */
    public async newProject(): Promise<NewProjectResponse> {
        const selectedProject = dialog.showOpenDialog(this._mainWindow, { properties: ['openDirectory', 'createDirectory'] });
        if (!selectedProject || selectedProject.length === 0) {
            return { newProjectHome: null };
        }

        return { newProjectHome: pathNormalize(selectedProject[0]) };
    }

    public async openProject(request: OpenProjectRequest): Promise<OpenProjectResponse> {
        const projectDirectory = request.projectKeyToOpen;
        return {
            message: 'ok I\'ll try to open it'
        };
    }

    public async recentProjects(): Promise<RecentProjectsResponse> {
        function _successfulLoad(text: string): RecentProjectsResponse {
            if (text) {
                return JSON.parse(text);
            } else {
                return { recentProjects: [] };
            }
        }

        function _failedLoad(error: string): RecentProjectsResponse {
            return { recentProjects: [] };
        }

        return getDataFromFilePath(this._projectListFile()).then(_successfulLoad, _failedLoad);
    }

    private _projectListFile(): string {
        return pathJoin(pathHome(), ".skein", "recent_projects.json");
    }
}
