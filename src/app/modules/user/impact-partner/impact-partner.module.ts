import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { ImpactPartnerRoutingModule } from './impact-partner-routing.module';
@NgModule({
  declarations: [ImpactPartnerRoutingModule.components, ],
  imports: [
    CommonModule,
    ImpactPartnerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class ImpactPartnerModule { }
