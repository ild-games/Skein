import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { NewProjectResponse, RecentProjectsResponse, ProjectSelection, OpenProjectResponse } from '../../server/server-response-types';
import { ProjectService } from '../project/project.service';
import { ServerCommunicationService } from '../server-communication/server-communication.service';
import { VERSION } from '../util/version';
import { OpenRecentProjectRequest } from '../../server/server-requests-types';


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

            <div class="right-section">
                <div class="actions">
                    <a (click)="onOpenClicked()">
                        <spl-icon iconClass="folder-open-o">
                        </spl-icon>
                        Open
                    </a>
                    <a (click)="onNewClicked()">
                        <spl-icon iconClass="file-o">
                        </spl-icon>
                        New
                    </a>
                </div>

                <mat-nav-list>
                    <mat-list-item
                        mat-list-item
                        *ngFor="let recentProject of recentProjects"
                        (click)="onRecentProjectClicked(recentProject)">

                        <p matLine class="project-name"> {{recentProject.name}} </p>
                        <p matLine class="project-root"> {{recentProject.root}} </p>
                    </mat-list-item>
                </mat-nav-list>
            </div>
        </div>
    `
})
export class ProjectSelectionComponent implements OnInit {
    /* hoisted variables for angular template */
    VERSION = VERSION;

    public recentProjects: ProjectSelection[] = [];

    constructor(
        private _project: ProjectService,
        private _serverComm: ServerCommunicationService) {
    }

    ngOnInit() {
        this._serverComm.get('centerAndResetToInitial');
        this._serverComm.get<RecentProjectsResponse>('recentProjects').then((response) => {
            this.recentProjects = response.recentProjects.slice(0, 7);
        });
    }

    public async onNewClicked() {
        let response = await this._serverComm.get<NewProjectResponse>('newProject');
        if (!response.newProject || !response.newProject.root) {
            return;
        }

        this._project.open(response.newProject);
    }

    public async onOpenClicked() {
        let response = await this._serverComm.get<OpenProjectResponse>('openProject');
        if (!response.openedProject || !response.openedProject.root) {
            return;
        }

        this._project.open(response.openedProject);
    }

    public async onRecentProjectClicked(project: ProjectSelection) {
        let request: OpenRecentProjectRequest = { recentProjectToOpen: project };
        await this._serverComm.post<OpenRecentProjectRequest>('openRecentProject', request);
        this._project.open(project);
    }
}
