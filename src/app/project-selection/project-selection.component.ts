import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { NewProjectResponse } from '../../server/server-response-types';
import { ProjectService } from '../project/project.service';
import { ServerCommunicationService } from '../server-communication/server-communication.service';


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

    constructor(
        private _project: ProjectService,
        private _serverComm: ServerCommunicationService) {
    }

    public async onNewClicked() {
        const response = await this._serverComm.get<NewProjectResponse>('newProject');
        if (!response.newProjectHome) {
            return;
        }

        this._project.open(response.newProjectHome);
    }
}
