import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeinMaterialModule } from './skein-material.module';
import { IconComponent } from './icon.component';

@NgModule({
    declarations: [
        IconComponent
    ],
    imports: [
        CommonModule,
        SkeinMaterialModule
    ],
    exports: [
        CommonModule,
        SkeinMaterialModule,
        IconComponent
    ],
})
export class ControlsModule {
}
