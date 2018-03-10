import * as child_process from 'child_process';

export function startSpoolServer(): child_process.ChildProcess {
    return child_process.spawn("node_modules/node/bin/node", ["dist/app/server.js"]);
}

export function killSpoolServer(process: child_process.ChildProcess) {
    process.kill();
}
