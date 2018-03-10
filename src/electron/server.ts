import * as child_process from 'child_process';


export function startSpoolServer(): child_process.ChildProcess {
    return child_process.execFile("./node_modules/.bin/http-server", ["./dist", "-p", "4200"]);
}

export function killSpoolServer(process: child_process.ChildProcess) {
    process.kill();
}
