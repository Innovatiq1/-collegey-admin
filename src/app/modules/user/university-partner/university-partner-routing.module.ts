import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UniversityPartnerViewInfoComponent } from './university-partner-details/university-partner-view-info/university-partner-view-info.component';
import { UniversityPartnerProfileComponent } from './university-partner-details/university-partner-profile/university-partner-profile.component';


const routes: Routes = [
  {
    path: '',
    component: UniversityPartnerViewInfoComponent,
  },
  {
    path: 'basic-info',
    component: UniversityPartnerViewInfoComponent
  },
  {
    path: 'profile',
    component: UniversityPartnerProfileComponent
  }

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniversityPartnerRoutingModule {
  static components = [UniversityPartnerViewInfoComponent, UniversityPartnerProfileComponent]
 }
