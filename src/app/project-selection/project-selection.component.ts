import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { NewProjectResponse } from '../../server/server-response-types';


@Component({
    selector: 'spl-project-selection',
    styleUrls: [
        './project-selection.component.scss'
    ],
    template: `
        <div class="container">
            <button (click)="clickButton()">
                New Project
            </button>
            {{currentProject}}
        </div>
    `
})
export class ProjectSelectionComponent {
    public currentProject = '';

    constructor(private _http: HttpClient) {
    }


    public clickButton() {
        this._http.get('http://localhost:4200/newProject').map((response: NewProjectResponse) => {
            if (!response) {
                return;
            }

            this.currentProject = response.newProjectKey;
        }).subscribe();
    }
}
