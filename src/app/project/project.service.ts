import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ServerCommunicationService } from '../server-communication/server-communication.service';
import { NewProjectResponse, ProjectSelection } from '../../server/server-response-types';
import { Project, switchProjectAction } from './project';
import { Subscription } from 'rxjs/Subscription';
import { PartialObserver } from 'rxjs/Observer';
import { StoreService } from '../state/store.service';
import { clearUndoHistoryAction } from '../state/undo-redo';
import { SkeinState } from '../state/skein-state';
import { SubscriptionService } from '../state/subscription.service';

@Injectable()
export class ProjectService extends SubscriptionService {
    private _project = new BehaviorSubject<Project>(null);

    constructor(
        private _serverComm: ServerCommunicationService,
        private _storeService: StoreService) {

        super();
        this._storeService.subscribe<SkeinState>((state) => {
            this._project.next(state.project);
        });
    }

    public async open(project: ProjectSelection): Promise<void> {
        if (!project || project.root === '') {
            return;
        }

        this._storeService.dispatch(switchProjectAction(project));
        this._storeService.dispatch(clearUndoHistoryAction());
    }

    protected _subscribableState(): BehaviorSubject<any> {
        return this._project;
    }
}
