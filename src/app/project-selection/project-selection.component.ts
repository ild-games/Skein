import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { NewProjectResponse, RecentProjectsResponse, RecentProject } from '../../server/server-response-types';
import { ProjectService } from '../project/project.service';
import { ServerCommunicationService } from '../server-communication/server-communication.service';
import { VERSION } from '../util/version';


@Component({
    selector: 'spl-project-selection',
    styleUrls: [
        './project-selection.component.scss'
    ],
    template: `
        <div class="container">
            <div class="left-section">
                <div class="skein-title-section">
                    <div class="skein-name">
                        Skein
                    </div>
                    <div class="skein-version">
                        {{VERSION}}
                    </div>
                </div>
            </div>

            <div class="right-section mat-elevation-z8">
                <mat-nav-list>
                    <mat-list-item
                        mat-list-item
                        *ngFor="let recentProject of recentProjects"
                        (click)="openProject({name: project.name, root: project.root})">

                        <p matLine class="project-name"> {{recentProject.name}} </p>
                        <p matLine class="project-root"> {{recentProject.root}} </p>
                    </mat-list-item>
                </mat-nav-list>

                <div class="actions">
                    <a (click)="onNewClicked()">
                        <spl-icon iconClass="file-o">
                        </spl-icon>
                        New
                    </a>
                </div>
            </div>
        </div>
    `
})
export class ProjectSelectionComponent implements OnInit {
    /* hoisted variables for angular template */
    VERSION = VERSION;

    public recentProjects: RecentProject[] = [];

    constructor(
        private _project: ProjectService,
        private _serverComm: ServerCommunicationService) {
    }

    ngOnInit() {
        this._serverComm.get<RecentProjectsResponse>('recentProjects').then((response) => {
            this.recentProjects = response.recentProjects.slice(0, 7);
        });
    }

    public async onNewClicked() {
        const response = await this._serverComm.get<NewProjectResponse>('newProject');
        if (!response.newProjectHome) {
            return;
        }

        this._project.open(response.newProjectHome);
    }
}
