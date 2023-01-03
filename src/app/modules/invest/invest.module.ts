import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestComponent } from './invest.component';
import { InvestListingComponent } from './invest-listing/invest-listing.component';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { NgantdModule } from 'src/app/ngantd/ngantd.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InvestRoutingModule } from './invest-routing.module';



@NgModule({
  declarations: [InvestRoutingModule.components],
  imports: [
    CommonModule,
    ThemeModule,
    NgantdModule,
    FormsModule,
    SharedModule,
    InvestRoutingModule
  ]
})
export class InvestModule { }
