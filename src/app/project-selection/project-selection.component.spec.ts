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
import { ProjectSelection } from '../../server/server-response-types';

describe('ProjectSelectionComponent', () => {
    let projectSelectionComponent: ProjectSelectionComponent = null;
    let projectService: ProjectService;
    let project: Project;
    let mockHttpRemotes: MockHttpRemotes;

    beforeEach(async(() => {
        mockHttpRemotes = {
            gets: {
                newProject: (params?: string[]) => {
                    return { newProject: null };
                },

                openProject: (params?: string[]) => {
                    return { openedProject: null };
                },

                recentProjects: (params?: string[]) => {
                    return {
                        recentProjects: [
                            {
                                name: 'Project1',
                                root: '/home/Project1',
                            }
                        ]
                    };
                },
            },

            posts: {
                openRecentProject: (body: { recentProjectToOpen: ProjectSelection }) => {
                    return null;
                }
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
        let fixture = TestBed.createComponent(ProjectSelectionComponent);
        projectSelectionComponent = fixture.componentInstance;
        projectSelectionComponent.ngOnInit();
        projectService = TestBed.get(ProjectService);
        projectService.subscribe((newProject: Project) => {
            project = newProject;
        });
    }));

    it('should create the component', async(() => {
        expect(projectSelectionComponent).toBeTruthy();
    }));

    it('should keep the project empty when a new project is initiated but the process is canceled', async(() => {
        projectSelectionComponent.onNewClicked().then(() => {
            expect(project).toEqual({});
        });
    }));

    it('should create a new project when the newProject button handler is called ', async(() => {
        mockHttpRemotes.gets.newProject = (params?: string[]) => new Object({
            newProject: {
                name: 'TestNewProject',
                root: '/test/root'
            }
        });
        projectSelectionComponent.onNewClicked().then(() => {
            expect(project.name).toBe('TestNewProject');
            expect(project.root).toBe('/test/root');
        });
    }));

    it('should keep the project empty when open is clicked but the process is canceled', async(() => {
        projectSelectionComponent.onOpenClicked().then(() => {
            expect(project).toEqual({});
        });
    }));

    it('should open a project when the openProject button handler is called', async(() => {
        mockHttpRemotes.gets.openProject = (params?: string[]) => {
            return {
                openedProject: {
                    name: 'Project1',
                    root: '/home/Project1',
                }
            };
        };
        projectSelectionComponent.onOpenClicked().then(() => {
            expect(project.name).toBe('Project1');
            expect(project.root).toBe('/home/Project1');
        });
    }));

    it('should open a recent project when the recent project button handler is called', async(() => {
        projectSelectionComponent.onRecentProjectClicked({ name: 'RecentProject1', root: '/home/RecentProject1' }).then(() => {
            expect(project.name).toBe('RecentProject1');
            expect(project.root).toBe('/home/RecentProject1');
        });
    }));
});
