import { TestBed, async } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { SkeinComponent } from './skein.component';
import { ProjectExplorerComponent } from '../project-explorer/project-explorer.component';
import { WorkspaceComponent } from '../workspace/workspace.component';
import { ProjectService } from '../project/project.service';
import { ServerCommunicationService } from '../server-communication/server-communication.service';
import { StoreService } from '../state/store.service';
import { mainReducer } from '../main.reducer';


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
                { provide: StoreService, useValue: new StoreService(mainReducer) },
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
