import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { NewProjectResponse } from '../../server/server-response-types';
import { ProjectService } from '../project/project.service';


@Component({
    selector: 'spl-project-selection',
    styleUrls: [
        './project-selection.component.scss'
    ],
    template: `
        <div class="container">
            <button (click)="onNewClicked()">
                New Project
            </button>
        </div>
    `
})
export class ProjectSelectionComponent {

    constructor(private _project: ProjectService) {
    }

    public async onNewClicked() {
        await this._project.newProject();
    }
}
