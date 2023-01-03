import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollegeyInFundRoutingModule } from './collegey-in-fund-routing.module';
import { FundInComponent } from './fund-in/fund-in.component';
import { FundInListComponent } from './fund-in-list/fund-in-list.component';

import { FormsModule } from '@angular/forms';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { MaterialModule } from 'src/app/material/material.module';
import { PipeModule } from 'src/app/shared/pipe.module';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [FundInComponent, FundInListComponent],
  imports: [
    CommonModule,
    CollegeyInFundRoutingModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    PipeModule,
    ThemeModule,
  ]
})
export class CollegeyInFundModule { }
