import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ShellComponent } from './shell/shell.component';
import { ShellModule } from './shell/shell.module';
import { ProjectExplorerModule } from './project-explorer/project-explorer.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { SkeinModule } from './skein/skein.module';
import { ProjectSelectionModule } from './project-selection/project-selection.module';
import { ControlsModule } from './controls/controls.module';
import { ServerCommuncationModule } from './server-communication/server-communication.module';
import { ProjectModule } from './project/project.module';
import { StateModule } from './state/state.module';
import { StoreService } from './state/store.service';
import { mainReducer } from './main.reducer';

@NgModule({
    imports: [
        BrowserModule,
        ControlsModule,
        HttpClientModule,
        ServerCommuncationModule,
        StateModule,
        ProjectModule,
        ShellModule,
        SkeinModule,
        ProjectSelectionModule,
        ProjectExplorerModule,
        WorkspaceModule
    ],
    providers: [
        { provide: StoreService, useValue: new StoreService(mainReducer) }
    ],
    entryComponents: [
        ShellComponent
    ]
})
export class SkeinAppModule {
    constructor(private _appRef: ApplicationRef) {
    }

    ngDoBootstrap() {
        this._appRef.bootstrap(ShellComponent);
    }
}
