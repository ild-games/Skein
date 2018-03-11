import * as express from 'express';
import { Server } from 'http';
import { dialog, BrowserWindow } from 'electron';

export interface SpoolServer {
    startServer: () => void;
    killServer: () => void;
}

export function initSpoolBackendServer(mainWindow: BrowserWindow): SpoolServer {
    const app = express();
    let serverInstance: Server = null;

    app.use(express.static(__dirname + '/spool'));

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    app.get('/newProject', (req, res) => {
        console.log('trying to get a new project4');
        res.send(dialog.showOpenDialog({ properties: ['openDirectory'] }));
    });

    return {
        startServer: () => {
            serverInstance = app.listen(4200, () => console.log('Spool server listening on port 4200!'));
        },

        killServer: () => {
            serverInstance.close();
        }
    };
}
