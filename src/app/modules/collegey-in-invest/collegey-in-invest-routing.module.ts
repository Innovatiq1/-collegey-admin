import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollegeyQuestionListComponent } from '../feeds/collegey-question-list/collegey-question-list.component';
import { InvestInCollegeyListComponent } from './invest-in-collegey-list/invest-in-collegey-list.component';


const routes: Routes = [
  {
    path:'invest-in-collegey-list',
    component:InvestInCollegeyListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollegeyInInvestRoutingModule { }
