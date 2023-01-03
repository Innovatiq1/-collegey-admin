import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CareerAtListComponent } from './career-at-list/career-at-list.component';


const routes: Routes = [
  {
    path:'career-at-list',
    component:CareerAtListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollegeyAtCareerRoutingModule { }
