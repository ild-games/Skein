import { NgModule } from '@angular/core';

import { ShellComponent } from './shell.component';
import { SpoolModule } from '../spool/spool.module';
import { ProjectSelectionModule } from '../project-selection/project-selection.module';
import { ControlsModule } from '../controls/controls.module';

@NgModule({
    imports: [
        SpoolModule,
        ProjectSelectionModule,
        ControlsModule
    ],
    declarations: [
        ShellComponent
    ],
    exports: [
        ShellComponent
    ]
})
export class ShellModule {
}
