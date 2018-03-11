import { TestBed, async } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { SpoolComponent } from './spool.component';
import { ProjectExplorerComponent } from '../project-explorer/project-explorer.component';
import { WorkspaceComponent } from '../workspace/workspace.component';
import { ProjectService } from '../project/project.service';
import { ServerCommunicationService } from '../server-communication/server-communication.service';


describe('SpoolComponent', () => {
    let spoolComponent: SpoolComponent = null;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SpoolComponent,
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
        spoolComponent = TestBed.createComponent(ProjectExplorerComponent).debugElement.componentInstance;
    }));

    it('should create the component', async(() => {
        expect(spoolComponent).toBeTruthy();
    }));
});
