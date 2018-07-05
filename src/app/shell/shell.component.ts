import { Component, OnDestroy } from '@angular/core';
import { ProjectService } from '../project/project.service';
import { Project } from '../project/project';
import { Subscription } from 'rxjs/Subscription';
import { undoKeyCombination, redoKeyCombination } from '../state/undo-redo';
import { StoreService } from '../state/store.service';
import { registerKeyDownHandler } from '../util/keyboard-multiplexer';

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


    constructor(
        private _project: ProjectService,
        private _storeService: StoreService) {
        this._projectSubscription = this._project.subscribe((newProject) => {
            this._onProjectChanged(newProject);
        });
        this._disableBrowserUndoRedo();
    }

    ngOnDestroy() {
        this._projectSubscription.unsubscribe();
    }

    private _onProjectChanged(newProject: Project) {
        if (newProject && newProject.root && newProject.root !== '') {
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

    private _disableBrowserUndoRedo() {
        registerKeyDownHandler((event) => {
            if (undoKeyCombination(event)) {
                event.rawEvent.preventDefault();
                this._storeService.undo();
            }

            if (redoKeyCombination(event)) {
                event.rawEvent.preventDefault();
                this._storeService.redo();
            }
        });
    }
}
