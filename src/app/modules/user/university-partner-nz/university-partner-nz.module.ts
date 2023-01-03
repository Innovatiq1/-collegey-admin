import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversityPartnerNzRoutingModule } from './university-partner-nz-routing.module';
import { UniversityPartnerNzComponent } from './university-partner-nz.component';
import { UniversityPartnerNzListingComponent } from './university-partner-nz-listing/university-partner-nz-listing.component';
import { AddUniversityPartnerNzComponent } from './add-university-partner-nz/add-university-partner-nz.component';


@NgModule({
  declarations: [UniversityPartnerNzComponent, UniversityPartnerNzListingComponent, AddUniversityPartnerNzComponent],
  imports: [
    CommonModule,
    UniversityPartnerNzRoutingModule
  ]
})
export class UniversityPartnerNzModule { }
