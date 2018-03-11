import { Component } from '@angular/core';

@Component({
    selector: 'spl-spool',
    styleUrls: [
        './spool.component.scss'
    ],
    template: `
        <div class="container">
            <div class="project-explorer">
                <spl-project-explorer></spl-project-explorer>
            </div>

            <div class="workspace">
                <spl-workspace></spl-workspace>
            </div>
        </div>
    `
})
export class SpoolComponent {
}
