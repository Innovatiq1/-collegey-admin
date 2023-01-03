import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FundInListComponent } from './fund-in-list/fund-in-list.component';


const routes: Routes = [
  {
    path:'fund-in-list',
    component:FundInListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollegeyInFundRoutingModule { }
