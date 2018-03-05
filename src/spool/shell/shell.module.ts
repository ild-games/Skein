import { NgModule } from "@angular/core";
import { ShellComponent } from "./shell.component";
import { ProjectExplorerModule } from "../project-explorer/project-explorer.module";
import { WorkspaceModule } from "../workspace/workspace.module";

@NgModule({
    imports: [
        ProjectExplorerModule,
        WorkspaceModule
    ],
    declarations: [
        ShellComponent
    ],
    exports: [
        ShellComponent
    ]
})
export class ShellModule {
}
