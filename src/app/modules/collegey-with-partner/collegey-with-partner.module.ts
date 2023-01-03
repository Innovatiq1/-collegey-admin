import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollegeyWithPartnerRoutingModule } from './collegey-with-partner-routing.module';
import { PartnerWithComponent } from './partner-with/partner-with.component';
import { PartnerWithListComponent } from './partner-with-list/partner-with-list.component';

import { FormsModule } from '@angular/forms';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { MaterialModule } from 'src/app/material/material.module';
import { PipeModule } from 'src/app/shared/pipe.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PartnerWithComponent, PartnerWithListComponent],
  imports: [
    CommonModule,
    CollegeyWithPartnerRoutingModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    PipeModule,
    ThemeModule,
  ]
})
export class CollegeyWithPartnerModule { }
