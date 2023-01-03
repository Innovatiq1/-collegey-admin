import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SchoolPartnerRoutingModule } from './school-partner-routing.module';

@NgModule({
  declarations: [SchoolPartnerRoutingModule.components],
  imports: [
    CommonModule,
    SchoolPartnerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class SchoolPartnerModule { }
