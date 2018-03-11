import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ServerCommunicationService } from '../server-communication/server-communication.service';
import { NewProjectResponse } from '../../server/server-response-types';
import { Project } from './project';

@Injectable()
export class ProjectService {
    public project: BehaviorSubject<Project>;

    constructor(private _serverComm: ServerCommunicationService) {
    }

    public async newProject(): Promise<string> {
        const response = await this._serverComm.get<NewProjectResponse>('newProject');
        return response.newProjectKey;
    }
}
