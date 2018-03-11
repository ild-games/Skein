import { ProjectService } from './project.service';
import { MockHttpRemotes, MockHttpClient } from '../server-communication/server-communication.service.spec';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ServerCommunicationService } from '../server-communication/server-communication.service';
import { Project } from './project';


describe('ServerCommunicationService', () => {
    let service: ProjectService;
    let project: Project;
    let mockHttpRemotes: MockHttpRemotes = {
        newProject: (params?: string[]) => {
            return { newProjectKey: null };
        }
    };
    let mockHttpClient = new MockHttpClient(mockHttpRemotes);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ProjectService,
                ServerCommunicationService,
                { provide: HttpClient, useValue: mockHttpClient }
            ]
        });
        service = TestBed.get(ProjectService);
        service.project.subscribe((newProject: Project) => {
            project = newProject;
        });
    });

    it('sets the project to null when newProject is invoked and an invalid result is returned from the server', () => {
        service.newProject().then(() => { expect(project).toBeNull(); });
    });

    it('sets the project values to a new project when newProject is invoked and a valid result is returned from the server', () => {
        mockHttpClient.remotes.newProject = (params?: string[]) => {
            return { newProjectKey: 'TestNewProject' };
        };

        service.newProject().then(() => { expect(project.key).toBe('TestNewProject'); });
    });
});
