import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramsComponent } from './programs/programs.component';
import { ProgramEnrollmentListingComponent } from './programs/program-enrollment-listing/program-enrollment-listing.component';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { MaterialModule } from 'src/app/material/material.module';
import { PipeModule } from 'src/app/shared/pipe.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EnrollmentRoutingModule } from './enrollments-routing.module';



@NgModule({
  declarations: [
    EnrollmentRoutingModule.components, 
    ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    PipeModule,
    ThemeModule,
    EnrollmentRoutingModule
  ]
})
export class EnrollmentsModule { }
