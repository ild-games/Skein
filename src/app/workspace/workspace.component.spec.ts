import { TestBed, async } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { WorkspaceComponent } from './workspace.component';


describe('WorkspaceComponent', () => {
    let workspaceComponent: WorkspaceComponent = null;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WorkspaceComponent
            ],
            providers: [
            ]
        }).compileComponents();
        workspaceComponent = TestBed.createComponent(WorkspaceComponent).debugElement.componentInstance;
    }));

    it('should create the component', async(() => {
        expect(workspaceComponent).toBeTruthy();
    }));
});
