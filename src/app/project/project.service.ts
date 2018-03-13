import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ServerCommunicationService } from '../server-communication/server-communication.service';
import { NewProjectResponse } from '../../server/server-response-types';
import { Project, switchProjectAction } from './project';
import { Subscription } from 'rxjs/Subscription';
import { PartialObserver } from 'rxjs/Observer';
import { StoreService } from '../state/store.service';
import { clearUndoHistoryAction } from '../state/undo-redo';

@Injectable()
export class ProjectService {
    private _project = new BehaviorSubject<Project>(null);

    constructor(
        private _serverComm: ServerCommunicationService,
        private _storeService: StoreService) {

        this._storeService.subscribe((state) => {
            this._project.next(state.project);
        });
    }

    public subscribe(next: (val: Project) => void): Subscription {
        return this._project.subscribe(next);
    }

    public async open(projectHome: string): Promise<void> {
        if (!projectHome || projectHome === '') {
            return;
        }

        this._storeService.dispatch(switchProjectAction(projectHome));
        this._storeService.dispatch(clearUndoHistoryAction());
    }
}
