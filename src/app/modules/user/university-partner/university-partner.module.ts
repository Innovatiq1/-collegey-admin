import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversityPartnerRoutingModule } from './university-partner-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [UniversityPartnerRoutingModule.components],
  imports: [
    CommonModule,
    UniversityPartnerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class UniversityPartnerModule { }
