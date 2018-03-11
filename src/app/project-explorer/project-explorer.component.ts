import { Component } from '@angular/core';
import { ProjectService } from '../project/project.service';


@Component({
    selector: 'spl-project-explorer',
    styleUrls: [
        './project-explorer.component.scss'
    ],
    template: `
        <div class="container">
            {{project.project.getValue().key}}
        </div>
    `
})
export class ProjectExplorerComponent {
    constructor(public project: ProjectService) {
    }
}
