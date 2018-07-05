import * as express from 'express';
import { Request, Response } from 'express';
import { Server } from 'http';
import { json as jsonBodyParser } from 'body-parser';
import { NewProjectResponse, RecentProjectsResponse, OpenProjectResponse } from './server-response-types';
import { OpenRecentProjectRequest } from './server-requests-types';
import { centerAndResetToInitial } from '../electron/util/window';

export const SKEIN_PROJECT_FILE_EXTENSION = 'skprj';
export interface ISkeinServer {
    // gets
    newProject(): Promise<NewProjectResponse>;
    openProject(): Promise<OpenProjectResponse>;
    recentProjects(): Promise<RecentProjectsResponse>;
    centerAndResetToInitial(): Promise<void>;

    // posts
    openRecentProject(request: OpenRecentProjectRequest): Promise<void>;
}

export interface ServerLifecycle {
    startServer(): void;
    killServer(): void;
}

export const MAX_RECENT_PROJECTS = 15;

export function initSkeinBackendServer(server: ISkeinServer): ServerLifecycle {
    const app = express();
    let expressServerInstance: Server = null;

    /* basic express setup */
    app.use(express.static(__dirname + '/../app'));
    app.use(jsonBodyParser());

    /* GET and POST handlers */
    app.get('/', (req, res) => res.sendFile('index.html', { root: __dirname + '/../app/' }));
    app.get('/newProject', async (req, res) => res.send(await server.newProject()));
    app.get('/openProject', async (req, res) => res.send(await server.openProject()));
    app.get('/recentProjects', async (req, res) => res.send(await server.recentProjects()));
    app.get('/centerAndResetToInitial', async (req, res) => res.send(await server.centerAndResetToInitial()));
    app.post('/openRecentProject', async (req, res) => res.send(await server.openRecentProject(req.body)));

    return {
        startServer: () => {
            expressServerInstance = app.listen(4200, () => console.log('Skein server listening on port 4200!'));
        },

        killServer: () => {
            expressServerInstance.close();
        }
    };
}
