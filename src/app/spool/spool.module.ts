import { NgModule } from '@angular/core';

import { SpoolComponent } from './spool.component';
import { ProjectExplorerModule } from '../project-explorer/project-explorer.module';
import { WorkspaceModule } from '../workspace/workspace.module';

@NgModule({
    imports: [
        ProjectExplorerModule,
        WorkspaceModule
    ],
    declarations: [
        SpoolComponent
    ],
    exports: [
        SpoolComponent
    ]
})
export class SpoolModule {
}
