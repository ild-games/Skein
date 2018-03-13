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
    private _projectKey: string = null;
    private _projectSubscription: Subscription = null;

    constructor(private _projectService: ProjectService) {
        this._projectSubscription = this._projectService.subscribe((newProject: Project) => {
            this._onProjectChanged(newProject);
        });
    }

    ngOnDestroy() {
        this._projectSubscription.unsubscribe();
    }

    private _onProjectChanged(newProject: Project) {
        if (newProject && newProject.home) {
            this._projectKey = newProject.home;
        }
    }

    get projectKey(): string {
        return this._projectKey;
    }
}
