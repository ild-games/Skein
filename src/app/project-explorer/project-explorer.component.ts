import { Component, OnDestroy } from '@angular/core';
import { ProjectService } from '../project/project.service';
import { Project } from '../project/project';
import { Subscription } from 'rxjs/Subscription';


@Component({
    selector: 'spl-project-explorer',
    styleUrls: [
        './project-explorer.component.scss'
    ],
    template: `
        <div class="container">
            {{projectKey}}
        </div>
    `
})
export class ProjectExplorerComponent implements OnDestroy {
    private _project: Project;
    private _projectSubscription: Subscription;

    constructor(private _projectService: ProjectService) {
        this._projectSubscription = this._projectService.project.subscribe((newProject: Project) => {
            this._onProjectChanged(newProject);
        });
    }

    ngOnDestroy() {
        this._projectSubscription.unsubscribe();
    }

    private _onProjectChanged(newProject: Project) {
        this._project = newProject;
    }

    get projectKey(): string {
        if (!this._project) {
            return null;
        }

        return this._project.key;
    }
}
