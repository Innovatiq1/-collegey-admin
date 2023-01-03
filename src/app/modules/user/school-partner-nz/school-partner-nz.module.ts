import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolPartnerNzRoutingModule } from './school-partner-nz-routing.module';
import { SchoolPartnerNzComponent } from './school-partner-nz.component';
import { SchoolPartnerNzListingComponent } from './school-partner-nz-listing/school-partner-nz-listing.component';
import { AddSchoolPartnerNzComponent } from './add-school-partner-nz/add-school-partner-nz.component';


@NgModule({
  declarations: [SchoolPartnerNzComponent, SchoolPartnerNzListingComponent, AddSchoolPartnerNzComponent],
  imports: [
    CommonModule,
    SchoolPartnerNzRoutingModule
  ]
})
export class SchoolPartnerNzModule { }
