import { Component } from '@angular/core';
import { ProjectService } from '../project/project.service';

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

            <div *ngIf="showSpool">
                <spl-spool></spl-spool>
            </div>
        </div>
    `
})
export class ShellComponent {
    constructor(private _project: ProjectService) {
    }

    public get showProjectSelection(): boolean {
        return !this._project.project.getValue();
    }

    public get showSpool(): boolean {
        return !!this._project.project.getValue();
    }
}
