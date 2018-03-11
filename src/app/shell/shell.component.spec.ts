import { TestBed, async } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { ShellComponent } from './shell.component';
import { SpoolComponent } from '../spool/spool.component';
import { ProjectSelectionComponent } from '../project-selection/project-selection.component';
import { ProjectExplorerComponent } from '../project-explorer/project-explorer.component';
import { WorkspaceComponent } from '../workspace/workspace.component';
import { ProjectService } from '../project/project.service';
import { ServerCommunicationService } from '../server-communication/server-communication.service';

describe('ShellComponent', () => {
    let shellComponent: ShellComponent = null;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ShellComponent,
                SpoolComponent,
                ProjectSelectionComponent,
                ProjectExplorerComponent,
                WorkspaceComponent
            ],
            providers: [
                ProjectService,
                ServerCommunicationService,
                HttpClient,
                HttpHandler
            ]
        }).compileComponents();
        shellComponent = TestBed.createComponent(ShellComponent).debugElement.componentInstance;
    }));

    it('should create the component', async(() => {
        expect(shellComponent).toBeTruthy();
    }));

    it('should start by showing the project selection screen', async(() => {
        expect(shellComponent.showProjectSelection).toBe(true);
        expect(shellComponent.showSpool).toBe(false);
    }));

    it('should show spool when the projectService gets a value', async(() => {
        let projectService = TestBed.get(ProjectService) as ProjectService;
        projectService.project.next({ key: 'NewProject' });
        expect(shellComponent.showSpool).toBe(true);
        expect(shellComponent.showProjectSelection).toBe(false);
    }));
});
