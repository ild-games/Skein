import { Component, Input } from '@angular/core';

@Component({
    selector: 'spl-icon',
    template: `
        <i class="fa fa-{{iconClass}}">
        </i>
    `
})
export class IconComponent {
    @Input() iconClass: string;
}
