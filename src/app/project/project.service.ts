import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ServerCommunicationService } from '../server-communication/server-communication.service';
import { NewProjectResponse } from '../../server/server-response-types';
import { Project } from './project';

@Injectable()
export class ProjectService {
    public project = new BehaviorSubject<Project>(null);

    constructor(private _serverComm: ServerCommunicationService) {
    }

    public async newProject(): Promise<void> {
        const response = await this._serverComm.get<NewProjectResponse>('newProject');
        if (!response.newProjectKey) {
            return;
        }

        this.project.next({ key: response.newProjectKey });
    }
}
