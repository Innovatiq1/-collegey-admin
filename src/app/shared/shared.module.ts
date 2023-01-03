import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { NavItemComponent } from './components/auth-route/nav-item/nav-item.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../material/material.module';
import { InputValidationComponent } from './components/input-validation/input-validation.component';
import { UploadDialogComponent } from './components/upload-dialog/upload-dialog.component';
import { PipeModule } from './pipe.module';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { LoadMoreComponent } from './components/load-more/load-more.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { QuillModule } from 'ngx-quill'
import { NgantdModule } from '../ngantd/ngantd.module';
import { ThemeModule } from '../@theme/theme.module';

const components = [
  NavItemComponent,
  HeaderComponent,
  InputValidationComponent,
  UploadDialogComponent,
  LoadMoreComponent
];


@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgantdModule,
    ThemeModule,
    PipeModule,
    AngularEditorModule,
    CKEditorModule,
    QuillModule.forRoot()
  ],
  exports: [...components, FormsModule, ReactiveFormsModule, PipeModule, AngularEditorModule,CKEditorModule,QuillModule,NgantdModule,ThemeModule],
  providers: [DatePipe]
})
export class SharedModule { }
