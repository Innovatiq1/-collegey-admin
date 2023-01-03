import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminListingComponent } from './admin-listing/admin-listing.component';
import { AddAdminComponent } from './add-admin/add-admin.component';


@NgModule({
  declarations: [AdminComponent, AdminListingComponent, AddAdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
