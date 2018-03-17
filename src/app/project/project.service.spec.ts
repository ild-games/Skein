import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { Project } from './project';
import { ProjectService } from './project.service';
import { ServerCommunicationService } from '../server-communication/server-communication.service';
import { StoreService } from '../state/store.service';
import { mainReducer } from '../main.reducer';

describe('ProjectService', () => {
    let service: ProjectService;
    let project: Project;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: StoreService, useValue: new StoreService(mainReducer) },
                ProjectService,
                ServerCommunicationService,
                HttpClient,
                HttpHandler
            ]
        });
        service = TestBed.get(ProjectService);
        service.subscribe((newProject: Project) => {
            project = newProject;
        });
    });

    it('has a default project value of empty when first created', () => {
        expect(project).toEqual({});
    });

    it('has a default project when open is invoked and an invalid result is returned from the server', () => {
        service.open(null).then(() => { expect(project).toEqual({}); });
    });

    it('sets the project values to a new project when open is invoked and a valid result is returned from the server', () => {
        service.open({ root: '/home/test', name: 'TestNewProject' }).then(() => { expect(project.root).toBe('TestNewProject'); });
    });
});
