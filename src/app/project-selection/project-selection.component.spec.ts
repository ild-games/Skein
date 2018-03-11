import { TestBed, async } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { ProjectSelectionComponent } from './project-selection.component';
import { ProjectService } from '../project/project.service';
import { ServerCommunicationService } from '../server-communication/server-communication.service';
import { MockHttpRemotes, MockHttpClient } from '../server-communication/server-communication.service.spec';
import { Project } from '../project/project';

describe('ProjectSelectionComponent', () => {
    let projectSelectionComponent: ProjectSelectionComponent = null;
    let projectService: ProjectService;
    let project: Project;

    let mockHttpRemotes: MockHttpRemotes = {
        newProject: (params?: string[]) => {
            return { newProjectKey: 'TestNewProject' };
        }
    };
    let mockHttpClient = new MockHttpClient(mockHttpRemotes);
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProjectSelectionComponent,
            ],
            providers: [
                ProjectService,
                ServerCommunicationService,
                { provide: HttpClient, useValue: mockHttpClient }
            ]
        }).compileComponents();
        projectSelectionComponent = TestBed.createComponent(ProjectSelectionComponent).debugElement.componentInstance;
        projectService = TestBed.get(ProjectService);
        projectService.project.subscribe((newProject: Project) => {
            project = newProject;
        });
    }));

    it('should create the component', async(() => {
        expect(projectSelectionComponent).toBeTruthy();
    }));

    it('should create a new project when the newProject button handler is called ', async(() => {
        projectSelectionComponent.onNewClicked().then(() => {
            expect(project.key).toBe('TestNewProject');
        });
    }));
});
