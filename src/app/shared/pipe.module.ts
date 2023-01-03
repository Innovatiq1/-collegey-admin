import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { GetImageName } from './pipes/get-image-name.pipe';

const pipeComponents = [
      CustomDatePipe,
      GetImageName
]

@NgModule({
    declarations: pipeComponents,
    imports: [
        CommonModule
    ],
    exports: pipeComponents
})
export class PipeModule { }
