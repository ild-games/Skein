import { NgModule } from '@angular/core';

import { ShellComponent } from './shell.component';
import { SkeinModule } from '../skein/skein.module';
import { ProjectSelectionModule } from '../project-selection/project-selection.module';
import { ControlsModule } from '../controls/controls.module';

@NgModule({
    imports: [
        SkeinModule,
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
