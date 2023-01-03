import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllusersRoutingModule } from './allusers-routing.module';
import { AllusersComponent } from './allusers.component';
import { AddAlluserComponent } from './add-alluser/add-alluser.component';
import { AlluserListingComponent } from './alluser-listing/alluser-listing.component';


@NgModule({
  declarations: [AllusersComponent, AddAlluserComponent, AlluserListingComponent],
  imports: [
    CommonModule,
    AllusersRoutingModule
  ]
})
export class AllusersModule { }
