import { TestBed, async } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { ProjectExplorerComponent } from './project-explorer.component';
import { ProjectService } from '../project/project.service';
import { ServerCommunicationService } from '../server-communication/server-communication.service';
import { StoreService } from '../state/store.service';
import { mainReducer } from '../main.reducer';

describe('ProjectExplorerComponent', () => {
    let projectExplorerComponent: ProjectExplorerComponent = null;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProjectExplorerComponent,
            ],
            providers: [
                { provide: StoreService, useValue: new StoreService(mainReducer) },
                ProjectService,
                ServerCommunicationService,
                HttpClient,
                HttpHandler
            ]
        }).compileComponents();
        projectExplorerComponent = TestBed.createComponent(ProjectExplorerComponent).debugElement.componentInstance;
    }));

    it('should create the component', async(() => {
        expect(projectExplorerComponent).toBeTruthy();
    }));

    it('does not have a project key when there is no project in the projectService', () => {
        let projectService = TestBed.get(ProjectService) as ProjectService;
        expect(projectExplorerComponent.projectKey).toBeNull();
    });

    it('has a project key equal to the key of the project created with the project service', () => {
        let projectService = TestBed.get(ProjectService) as ProjectService;
        projectService.open('NewProject').then(() => {
            expect(projectExplorerComponent.projectKey).toBe('NewProject');
        });
    });
});
