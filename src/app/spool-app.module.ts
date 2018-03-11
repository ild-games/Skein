import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { ShellComponent } from './shell/shell.component';
import { ShellModule } from './shell/shell.module';
import { ProjectExplorerModule } from './project-explorer/project-explorer.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { SpoolModule } from './spool/spool.module';
import { ProjectSelectionModule } from './project-selection/project-selection.module';
import { ControlsModule } from './controls/controls.module';

@NgModule({
    imports: [
        BrowserModule,
        ControlsModule,
        HttpClientModule,
        ShellModule,
        SpoolModule,
        ProjectSelectionModule,
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
