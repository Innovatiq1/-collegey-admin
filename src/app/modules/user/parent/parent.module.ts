import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentRoutingModule } from './parent-routing.module';
import { ParentComponent } from './parent.component';
import { ParentListingComponent } from './parent-listing/parent-listing.component';
import { AddParentsComponent } from './add-parents/add-parents.component';


@NgModule({
  declarations: [ParentComponent, ParentListingComponent, AddParentsComponent],
  imports: [
    CommonModule,
    ParentRoutingModule
  ]
})
export class ParentModule { }
