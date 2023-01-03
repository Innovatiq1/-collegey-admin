import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolPartnerViewInfoComponent } from './school-partner-details/school-partner-view-info/school-partner-view-info.component';
import { SchoolPartnerProfileComponent } from './school-partner-details/school-partner-profile/school-partner-profile.component';


const routes: Routes = [
  {
    path: '',
    component: SchoolPartnerViewInfoComponent,
    
  },
  {
    path: 'basic-info',
    component: SchoolPartnerViewInfoComponent
  },
  {
    path: 'profile',
    component: SchoolPartnerProfileComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolPartnerRoutingModule {
  static components = [SchoolPartnerViewInfoComponent, SchoolPartnerProfileComponent]
 }
