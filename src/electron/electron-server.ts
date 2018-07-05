import { dialog, BrowserWindow } from 'electron';
import { Response, Request } from 'express';

import { ISkeinServer, MAX_RECENT_PROJECTS, SKEIN_PROJECT_FILE_EXTENSION } from '../server/skein-server';
import { NewProjectResponse, RecentProjectsResponse, ProjectSelection, OpenProjectResponse } from '../server/server-response-types';
import { OpenRecentProjectRequest } from '../server/server-requests-types';
import {
    normalize as pathNormalize,
    join as pathJoin,
    home as pathHome,
    basename as pathBaseName,
    dirname as pathDirName
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
        let newName = this._projectNameFromRoot(newRoot);
        let newProject = { root: newRoot, name: newName };
        await this._writeNewProjectFile(newRoot, newName);
        await this._openProjectSideEffects(newProject);
        return { newProject: newProject };
    }

    public async openProject(): Promise<OpenProjectResponse> {
        let openProjectFilters = [{ name: 'Skein Projects', extensions: [SKEIN_PROJECT_FILE_EXTENSION] }];
        const selectedProject = dialog.showOpenDialog(this._mainWindow, { properties: ['openFile'], filters: openProjectFilters });
        if (!selectedProject || selectedProject.length === 0) {
            return { openedProject: null };
        }

        let openedRoot = pathDirName(selectedProject[0]);
        let openedName = this._projectNameFromRoot(openedRoot);
        let openedProject = { root: openedRoot, name: openedName };
        await this._openProjectSideEffects(openedProject);
        return { openedProject };
    }

    public async openRecentProject(request: OpenRecentProjectRequest): Promise<void> {
        await this._openProjectSideEffects(request.recentProjectToOpen);
    }

    public async recentProjects(): Promise<RecentProjectsResponse> {
        return await this._getRecentProjectsContents();
    }

    public async centerAndResetToInitial(): Promise<void> {
        windowCenterAndResetToInitial(this._mainWindow);
    }

    private async _writeNewProjectFile(root: string, projectName: string) {
        return await saveDataToPath(pathJoin(root, `${projectName}.${SKEIN_PROJECT_FILE_EXTENSION}`), '');
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
