import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpactPartnerViewInfoComponent } from './impact-partner-details/impact-partner-view-info/impact-partner-view-info.component';
import { ImpactPartnerProfileComponent } from './impact-partner-details/impact-partner-profile/impact-partner-profile.component';

const routes: Routes = [
  {
    path: '',
    component: ImpactPartnerViewInfoComponent,
  },
  {
    path: 'basic-info',
    component: ImpactPartnerViewInfoComponent,
  },
  {
      path: 'profile',
      component: ImpactPartnerProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImpactPartnerRoutingModule {
  static components = [ImpactPartnerViewInfoComponent, ImpactPartnerProfileComponent];
}
