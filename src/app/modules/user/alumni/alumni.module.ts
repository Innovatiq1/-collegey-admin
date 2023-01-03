import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumniRoutingModule } from './alumni-routing.module';
import { AlumniComponent } from './alumni.component';
import { AlumniListingComponent } from './alumni-listing/alumni-listing.component';
import { AddAlumniComponent } from './add-alumni/add-alumni.component';


@NgModule({
  declarations: [AlumniComponent, AlumniListingComponent, AddAlumniComponent],
  imports: [
    CommonModule,
    AlumniRoutingModule
  ]
})
export class AlumniModule { }
