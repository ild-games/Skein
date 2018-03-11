import * as express from 'express';
import { Request, Response } from 'express';
import { Server } from 'http';
import { NewProjectResponse, OpenProjectResponse } from './server-response-types';
import { OpenProjectRequest, parseOpenProjectRequest } from './server-requests-types';

export interface ISkeinServer {
    newProject(): NewProjectResponse;
    openProject(request: OpenProjectRequest): OpenProjectResponse;
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
    app.get('/', (req, res) => res.sendFile('index.html', { root: __dirname + '/../app/' }));


    /* GET and POST handlers */
    app.get('/newProject', (req, res) => res.send(server.newProject()));
    app.get('/openProject', (req, res) => res.send(server.openProject(parseOpenProjectRequest(req))));

    return {
        startServer: () => {
            expressServerInstance = app.listen(4200, () => console.log('Skein server listening on port 4200!'));
        },

        killServer: () => {
            expressServerInstance.close();
        }
    };
}
