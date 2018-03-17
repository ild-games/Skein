import { TestBed, async } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { ProjectSelectionComponent } from './project-selection.component';
import { ProjectService } from '../project/project.service';
import { ServerCommunicationService } from '../server-communication/server-communication.service';
import { Project } from '../project/project';
import { StoreService } from '../state/store.service';
import { mainReducer } from '../main.reducer';
import { MockHttpRemotes, MockHttpClient } from '../server-communication/server-communication-test-helpers';
import { ControlsModule } from '../controls/controls.module';

describe('ProjectSelectionComponent', () => {
    let projectSelectionComponent: ProjectSelectionComponent = null;
    let projectService: ProjectService;
    let project: Project;
    let mockHttpRemotes: MockHttpRemotes;

    beforeEach(async(() => {
        mockHttpRemotes = {
            newProject: (params?: string[]) => {
                return { newProjectHome: null };
            }
        };
        let mockHttpClient = new MockHttpClient(mockHttpRemotes);
        TestBed.configureTestingModule({
            imports: [
                ControlsModule
            ],
            declarations: [
                ProjectSelectionComponent,
            ],
            providers: [
                { provide: StoreService, useValue: new StoreService(mainReducer) },
                ProjectService,
                ServerCommunicationService,
                { provide: HttpClient, useValue: mockHttpClient }
            ]
        }).compileComponents();
        projectSelectionComponent = TestBed.createComponent(ProjectSelectionComponent).debugElement.componentInstance;
        projectService = TestBed.get(ProjectService);
        projectService.subscribe((newProject: Project) => {
            project = newProject;
        });
    }));

    it('should create the component', async(() => {
        expect(projectSelectionComponent).toBeTruthy();
    }));

    it('should keep the project home as undefined when a new project is initiated but the process is canceled', async(() => {
        projectSelectionComponent.onNewClicked().then(() => {
            expect(project.root).toBeUndefined();
        });
    }));

    it('should create a new project when the newProject button handler is called ', async(() => {
        mockHttpRemotes.newProject = (params?: string[]) => new Object({ newProjectHome: 'TestNewProject' });
        projectSelectionComponent.onNewClicked().then(() => {
            expect(project.root).toBe('TestNewProject');
        });
    }));
});
