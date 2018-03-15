import * as express from 'express';
import { Request, Response } from 'express';
import { Server } from 'http';
import { json as jsonBodyParser } from 'body-parser';
import { NewProjectResponse, OpenProjectResponse, RecentProjectsResponse } from './server-response-types';
import { OpenProjectRequest } from './server-requests-types';

export interface ISkeinServer {
    newProject(): Promise<NewProjectResponse>;
    openProject(request: OpenProjectRequest): Promise<OpenProjectResponse>;
    recentProjects(): Promise<RecentProjectsResponse>;
}

export interface ServerLifecycle {
    startServer(): void;
    killServer(): void;
}

export function initSkeinBackendServer(server: ISkeinServer): ServerLifecycle {
    const app = express();
    let expressServerInstance: Server = null;

    /* basic express setup */
    app.use(express.static(__dirname + '/../app'));
    app.use(jsonBodyParser());

    /* GET and POST handlers */
    app.get('/', (req, res) => res.sendFile('index.html', { root: __dirname + '/../app/' }));
    app.get('/newProject', async (req, res) => res.send(await server.newProject()));
    app.get('/recentProjects', async (req, res) => res.send(await server.recentProjects()));
    app.post('/openProject', async (req, res) => res.send(await server.openProject(req.body)));

    return {
        startServer: () => {
            expressServerInstance = app.listen(4200, () => console.log('Skein server listening on port 4200!'));
        },

        killServer: () => {
            expressServerInstance.close();
        }
    };
}
