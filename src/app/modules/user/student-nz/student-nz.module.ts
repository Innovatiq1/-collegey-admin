import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentNzRoutingModule } from './student-nz-routing.module';
import { StudentNzComponent } from './student-nz.component';
import { AddStudentNzComponent } from './add-student-nz/add-student-nz.component';
import { StudentNzListingComponent } from './student-nz-listing/student-nz-listing.component';
import { ShowStudentInformationComponent } from './show-student-information/show-student-information.component';


@NgModule({
  declarations: [StudentNzComponent, AddStudentNzComponent, StudentNzListingComponent, ShowStudentInformationComponent],
  imports: [
    CommonModule,
    StudentNzRoutingModule
  ]
})
export class StudentNzModule { }
