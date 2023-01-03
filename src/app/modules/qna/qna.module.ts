import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { MaterialModule } from 'src/app/material/material.module';
import { PipeModule } from 'src/app/shared/pipe.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { QnaRoutingModule } from './qna-routing.module';
import { QnaListComponent } from './qna-list/qna-list.component';
import { ViewQnaComponent } from './view-qna/view-qna.component';


@NgModule({
  declarations: [QnaListComponent, ViewQnaComponent],
  imports: [
    CommonModule,
    QnaRoutingModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    PipeModule,
    ThemeModule,
  ]
})
export class QnaModule { }
