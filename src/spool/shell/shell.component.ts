import { Component } from "@angular/core";

@Component({
    selector: 'spl-shell',
    styleUrls: [
        './spool/shell/shell.component.css'
    ],
    template: `
        <div class="shell">
            <div class="project-explorer">
                <spl-project-explorer></spl-project-explorer>
            </div>

            <div class="workspace">
                <spl-workspace></spl-workspace>
            </div>
        </div>
    `
})
export class ShellComponent {

}
