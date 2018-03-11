import { TestBed, async } from '@angular/core/testing';

import { ShellComponent } from './shell.component';
import { SpoolComponent } from '../spool/spool.component';
import { ProjectSelectionComponent } from '../project-selection/project-selection.component';
import { ProjectExplorerComponent } from '../project-explorer/project-explorer.component';
import { WorkspaceComponent } from '../workspace/workspace.component';
import { ProjectService } from '../project/project.service';
import { ServerCommunicationService } from '../server-communication/server-communication.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ShellComponent', () => {
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
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(ShellComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
