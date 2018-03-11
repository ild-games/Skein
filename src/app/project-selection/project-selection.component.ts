import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';


@Component({
    selector: 'spl-project-selection',
    styleUrls: [
        './project-selection.component.scss'
    ],
    template: `
        <div class="container">
            <button (click)="clickButton()">
                New Project
            </button>
            Project Selection2
        </div>
    `
})
export class ProjectSelectionComponent {
    constructor(private _http: HttpClient) {
    }


    public clickButton() {
        this._http.get('http://localhost:4200/newProject', { responseType: 'text' }).map((response: string) => {
            console.log(response);
        }).subscribe();
    }
}
