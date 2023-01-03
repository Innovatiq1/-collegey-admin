import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpactProfileNzRoutingModule } from './impact-profile-nz-routing.module';
import { ImpactProfileNzComponent } from './impact-profile-nz.component';
import { ImpactPartnerNzListingComponent } from './impact-partner-nz-listing/impact-partner-nz-listing.component';
import { AddImpactPartnerNzComponent } from './add-impact-partner-nz/add-impact-partner-nz.component';


@NgModule({
  declarations: [ImpactProfileNzComponent, ImpactPartnerNzListingComponent, AddImpactPartnerNzComponent],
  imports: [
    CommonModule,
    ImpactProfileNzRoutingModule
  ]
})
export class ImpactProfileNzModule { }
