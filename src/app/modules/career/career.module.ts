import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareerComponent } from './career.component';
import { CareerListingComponent } from './career-listing/career-listing.component';
import { CareerRoutingModule } from './career-routing.module';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { NgantdModule } from 'src/app/ngantd/ngantd.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [CareerRoutingModule.components],
  imports: [
    CommonModule,
    ThemeModule,
    NgantdModule,
    FormsModule,
    SharedModule,
    CareerRoutingModule
  ]
})
export class CareerModule { }
