import { dialog, BrowserWindow } from 'electron';
import { Response, Request } from 'express';

import { ISkeinServer, MAX_RECENT_PROJECTS } from '../server/skein-server';
import { NewProjectResponse, RecentProjectsResponse, ProjectSelection } from '../server/server-response-types';
import { OpenProjectRequest } from '../server/server-requests-types';
import {
    normalize as pathNormalize,
    join as pathJoin,
    home as pathHome,
    basename as pathBaseName
} from './util/path';
import { getDataFromFilePath, saveDataToPath, SaveResult } from './util/file-operations';
import { removeIf } from './util/array-extensions';
import { centerAndResetToInitial as windowCenterAndResetToInitial } from './util/window';

export class ElectronSkeinServer implements ISkeinServer {

    constructor(private _mainWindow: BrowserWindow) {
    }

    public async newProject(): Promise<NewProjectResponse> {
        const selectedProject = dialog.showOpenDialog(this._mainWindow, { properties: ['openDirectory', 'createDirectory'] });
        if (!selectedProject || selectedProject.length === 0) {
            return { newProject: null };
        }

        let newRoot = pathNormalize(selectedProject[0]);
        let newProject = {
            root: newRoot,
            name: this._projectNameFromRoot(newRoot)
        };
        await this._openProjectSideEffects(newProject);
        return { newProject: newProject };
    }

    public async openProject(request: OpenProjectRequest): Promise<void> {
        await this._openProjectSideEffects(request.projectToOpen);
    }

    public async recentProjects(): Promise<RecentProjectsResponse> {
        return await this._getRecentProjectsContents();
    }

    public async centerAndResetToInitial(): Promise<void> {
        windowCenterAndResetToInitial(this._mainWindow);
    }

    private async _openProjectSideEffects(projectBeingOpened: ProjectSelection) {
        this._mainWindow.setResizable(true);
        this._mainWindow.maximize();
        this._mainWindow.setTitle(`${this._mainWindow.getTitle()} - ${projectBeingOpened.name}`);
        let newRecentProjects = await this._prepRecentProjectsContents(projectBeingOpened);
        await this._writeRecentProjectFile(newRecentProjects);
    }

    private async _prepRecentProjectsContents(projectBeingOpened: ProjectSelection): Promise<RecentProjectsResponse> {
        let recentProjectsJson = await this._getRecentProjectsContents();
        removeIf<ProjectSelection>(recentProjectsJson.recentProjects, (item, idx) => item.root === projectBeingOpened.root);
        let newRecentProjects: ProjectSelection[];
        if (recentProjectsJson.length < MAX_RECENT_PROJECTS) {
            newRecentProjects = [projectBeingOpened].concat(recentProjectsJson.recentProjects);
        } else {
            newRecentProjects = [projectBeingOpened].concat(recentProjectsJson.recentProjects.slice(0, MAX_RECENT_PROJECTS));
        }
        return { recentProjects: newRecentProjects };
    }

    private async _getRecentProjectsContents(): Promise<RecentProjectsResponse> {
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

        return getDataFromFilePath(this._projectListFile).then(_successfulLoad, _failedLoad);
    }

    private async _writeRecentProjectFile(contents: RecentProjectsResponse): Promise<SaveResult> {
        return await saveDataToPath(this._projectListFile, JSON.stringify(contents, null, 4));
    }

    private _projectNameFromRoot(projectRoot: string): string {
        return pathBaseName(projectRoot);
    }

    private get _projectListFile(): string {
        return pathJoin(pathHome(), '.skein', 'recent_projects.json');
    }
}
