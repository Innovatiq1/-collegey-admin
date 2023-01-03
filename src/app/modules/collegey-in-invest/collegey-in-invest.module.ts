import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollegeyInInvestRoutingModule } from './collegey-in-invest-routing.module';
import { InvestInCollegeyListComponent } from './invest-in-collegey-list/invest-in-collegey-list.component';
import { InvestInComponent } from './invest-in/invest-in.component';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { MaterialModule } from 'src/app/material/material.module';
import { PipeModule } from 'src/app/shared/pipe.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [InvestInCollegeyListComponent, InvestInComponent],
  imports: [
    CommonModule,
    CollegeyInInvestRoutingModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    PipeModule,
    ThemeModule,
  ]
})
export class CollegeyInInvestModule { }
