import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CounsellorRoutingModule } from './counsellor-routing.module';
import { CounsellorComponent } from './counsellor.component';
import { CounsellorListingComponent } from './counsellor-listing/counsellor-listing.component';
import { AddCounsellorsComponent } from './add-counsellors/add-counsellors.component';


@NgModule({
  declarations: [CounsellorComponent, CounsellorListingComponent, AddCounsellorsComponent],
  imports: [
    CommonModule,
    CounsellorRoutingModule
  ]
})
export class CounsellorModule { }
