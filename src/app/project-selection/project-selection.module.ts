import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ProjectSelectionComponent } from './project-selection.component';
import { ControlsModule } from '../controls/controls.module';


@NgModule({
    declarations: [
        ProjectSelectionComponent
    ],
    imports: [
        ControlsModule
    ],
    exports: [
        ProjectSelectionComponent
    ]
})
export class ProjectSelectionModule {
}
