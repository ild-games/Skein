import { TestBed, async } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { ShellComponent } from './shell.component';
import { SkeinComponent } from '../skein/skein.component';
import { ProjectSelectionComponent } from '../project-selection/project-selection.component';
import { ProjectExplorerComponent } from '../project-explorer/project-explorer.component';
import { WorkspaceComponent } from '../workspace/workspace.component';
import { ProjectService } from '../project/project.service';
import { ServerCommunicationService } from '../server-communication/server-communication.service';
import { StoreService } from '../state/store.service';
import { mainReducer } from '../main.reducer';
import { getState } from '../state/undo-redo.spec';
import { createUndoRedoReducer } from '../state/undo-redo';
import { Store, createStore } from 'redux';
import { testReducer, testAction } from '../state/store.service.spec';

describe('ShellComponent', () => {
    let shellComponent: ShellComponent = null;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ShellComponent,
                SkeinComponent,
                ProjectSelectionComponent,
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
        shellComponent = TestBed.createComponent(ShellComponent).debugElement.componentInstance;
    }));

    it('should create the component', async(() => {
        expect(shellComponent).toBeTruthy();
    }));

    it('should start by showing the project selection screen', async(() => {
        expect(shellComponent.showProjectSelection).toBe(true);
        expect(shellComponent.showSkein).toBe(false);
    }));

    it('should show skein when the projectService gets a value', async(() => {
        let projectService = TestBed.get(ProjectService) as ProjectService;
        projectService.open('NewProject').then(() => {
            expect(shellComponent.showSkein).toBe(true);
            expect(shellComponent.showProjectSelection).toBe(false);
        });
    }));

    describe('undo/redo keyboard events', () => {
        beforeEach(async(() => {
            TestBed.resetTestingModule();
            // create a new store service so that document's keyboard events will be triggered
            TestBed.configureTestingModule({
                declarations: [
                    ShellComponent,
                    SkeinComponent,
                    ProjectSelectionComponent,
                    ProjectExplorerComponent,
                    WorkspaceComponent
                ],
                providers: [
                    { provide: StoreService, useValue: new StoreService(testReducer) },
                    ProjectService,
                    ServerCommunicationService,
                    HttpClient,
                    HttpHandler
                ]
            }).compileComponents();
            shellComponent = TestBed.createComponent(ShellComponent).debugElement.componentInstance;
        }));

        it('should capture the undo keyboard shortcut', async(() => {
            let storeService = TestBed.get(StoreService) as StoreService;
            let testState = { isNewState: true };
            storeService.dispatch(testAction(testState));
            expect(storeService.getState()).toBe(testState);
            let undoEvent = new KeyboardEvent('keypress', { ctrlKey: true, key: 'z' });
            document.onkeydown(undoEvent);
            expect(storeService.getState()).not.toBe(testState);
        }));

        it('should capture the redo keyboard shortcut', async(() => {
            let storeService = TestBed.get(StoreService) as StoreService;
            storeService.dispatch(testAction({ isNewState: true }));
            expect(storeService.getState().isNewState).toEqual(true);
            let undoEvent = new KeyboardEvent('keypress', { ctrlKey: true, key: 'z' });
            document.onkeydown(undoEvent);
            expect(storeService.getState().isDefaultState).toEqual(true);
            let redoEvent = new KeyboardEvent('keypress', { ctrlKey: true, shiftKey: true, key: 'z' });
            document.onkeydown(redoEvent);
            expect(storeService.getState().isNewState).toEqual(true);
        }));
    });
});
