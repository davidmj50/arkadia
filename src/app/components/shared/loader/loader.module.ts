import { NgModule } from "@angular/core";
import { LoaderComponent } from "./loader.component";
import { CommonModule } from "@angular/common";
import {ProgressSpinnerModule} from 'primeng/progressspinner';
@NgModule({
    declarations: [LoaderComponent],
    imports: [
        CommonModule,
        ProgressSpinnerModule
    ],
    exports: [LoaderComponent]
})

export class LoaderModule {};