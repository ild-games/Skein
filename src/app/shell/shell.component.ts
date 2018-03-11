import { Component, OnDestroy } from '@angular/core';
import { ProjectService } from '../project/project.service';
import { Project } from '../project/project';
import { Subscription } from 'rxjs/Subscription';

enum ShowMode {
    ProjectSelection,
    Skein
}

@Component({
    selector: 'spl-shell',
    styleUrls: [
        './shell.component.scss'
    ],
    template: `
        <div class="container">
            <div *ngIf="showProjectSelection">
                <spl-project-selection></spl-project-selection>
            </div>

            <div *ngIf="showSkein">
                <spl-skein></spl-skein>
            </div>
        </div>
    `
})
export class ShellComponent implements OnDestroy {
    private _showMode = ShowMode.ProjectSelection;
    private _projectSubscription: Subscription;


    constructor(private _project: ProjectService) {
        this._projectSubscription = this._project.project.subscribe((newProject) => {
            this._onProjectChanged(newProject);
        });
    }

    ngOnDestroy() {
        this._projectSubscription.unsubscribe();
    }

    private _onProjectChanged(newProject: Project) {
        if (!!newProject) {
            this._showMode = ShowMode.Skein;
        } else {
            this._showMode = ShowMode.ProjectSelection;
        }
    }

    public get showProjectSelection(): boolean {
        return this._showMode === ShowMode.ProjectSelection;
    }

    public get showSkein(): boolean {
        return this._showMode === ShowMode.Skein;
    }
}
