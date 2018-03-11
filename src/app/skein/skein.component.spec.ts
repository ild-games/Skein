import { TestBed, async } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { SkeinComponent } from './skein.component';
import { ProjectExplorerComponent } from '../project-explorer/project-explorer.component';
import { WorkspaceComponent } from '../workspace/workspace.component';
import { ProjectService } from '../project/project.service';
import { ServerCommunicationService } from '../server-communication/server-communication.service';


describe('SkeinComponent', () => {
    let skeinComponent: SkeinComponent = null;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SkeinComponent,
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
        skeinComponent = TestBed.createComponent(ProjectExplorerComponent).debugElement.componentInstance;
    }));

    it('should create the component', async(() => {
        expect(skeinComponent).toBeTruthy();
    }));
});
