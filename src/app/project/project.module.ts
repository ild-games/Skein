import { NgModule } from '@angular/core';

import { ControlsModule } from '../controls/controls.module';
import { ProjectService } from './project.service';

@NgModule({
    imports: [
        ControlsModule
    ],
    providers: [
        ProjectService
    ]
})
export class ProjectModule {
}
