import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ShellComponent } from './shell/shell.component';
import { ShellModule } from './shell/shell.module';
import { ProjectExplorerModule } from './project-explorer/project-explorer.module';
import { WorkspaceModule } from './workspace/workspace.module';

@NgModule({
    imports: [
        BrowserModule,
        ShellModule,
        ProjectExplorerModule,
        WorkspaceModule
    ],
    entryComponents: [
        ShellComponent
    ]
})
export class SpoolAppModule {
    constructor(private _appRef: ApplicationRef) {
    }

    ngDoBootstrap() {
        this._appRef.bootstrap(ShellComponent);
    }
}
