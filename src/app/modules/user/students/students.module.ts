import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentsRoutingModule } from './students-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [StudentsRoutingModule.components],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MaterialModule,
    MatDialogModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,NzModalModule
    
  ],
  // entryComponents: [StudentGeographyComponent, StudentHistoryComponent]
})
export class StudentsModule { }
