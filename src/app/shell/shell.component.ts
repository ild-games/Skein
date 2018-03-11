import { Component } from '@angular/core';

@Component({
    selector: 'spl-shell',
    styleUrls: [
        './shell.component.scss'
    ],
    template: `
        <div class="container">
            <div *ngIf="showSplash">
                <spl-project-selection></spl-project-selection>
            </div>

            <div *ngIf="showProject">
                <spl-spool></spl-spool>
            </div>
        </div>
    `
})
export class ShellComponent {

    public get showSplash(): boolean {
        return true;
    }

    public get showProject(): boolean {
        return false;
    }
}
