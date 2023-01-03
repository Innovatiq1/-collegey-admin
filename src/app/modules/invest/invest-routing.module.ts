import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestListingComponent } from './invest-listing/invest-listing.component';
import { InvestComponent } from './invest.component';



const routes: Routes = [ 
  {
    path: '',
    component: InvestComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestRoutingModule {
  static components = [
    InvestComponent,
    InvestListingComponent
  ];
}
