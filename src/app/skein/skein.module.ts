import { NgModule } from '@angular/core';

import { SkeinComponent } from './skein.component';
import { ProjectExplorerModule } from '../project-explorer/project-explorer.module';
import { WorkspaceModule } from '../workspace/workspace.module';

@NgModule({
    imports: [
        ProjectExplorerModule,
        WorkspaceModule
    ],
    declarations: [
        SkeinComponent
    ],
    exports: [
        SkeinComponent
    ]
})
export class SkeinModule {
}
