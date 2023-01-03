import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramEnrollmentListingComponent } from './programs/program-enrollment-listing/program-enrollment-listing.component';
import { ProgramsComponent } from './programs/programs.component';


const routes: Routes = [
  {
    path: 'programs',
    component: ProgramsComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnrollmentRoutingModule {
  static components = [
    ProgramsComponent,
    ProgramEnrollmentListingComponent
  ];
}
