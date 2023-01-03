import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerWithListComponent } from './partner-with-list/partner-with-list.component';
import { PartnerWithComponent } from './partner-with/partner-with.component';


const routes: Routes = [
  {
    path:"partner-with-list",
    component:PartnerWithListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollegeyWithPartnerRoutingModule { }
