'use strict';

import { BrowserWindow, app } from 'electron';
import { startSpoolServer, killSpoolServer } from './server';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow;

function createWindow() {
    let serverProcess = startSpoolServer();

    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        title: "Spool",
        height: 600,
        icon: __dirname + "/../assets/images/icon.png",
        webPreferences: {
            nodeIntegration: false,
            preload: './preload.js'
        }
    });


    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    let loadSpoolURL = () => mainWindow.loadURL('http://localhost:4200/index.html');
    loadSpoolURL();

    mainWindow.webContents.on('did-fail-load', () => {
        setTimeout(() => loadSpoolURL(), 250);
    });

    app.on('before-quit', function () {
        killSpoolServer(serverProcess);
    });

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {

    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
