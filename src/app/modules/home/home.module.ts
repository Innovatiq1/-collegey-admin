import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NbCardModule } from '@nebular/theme';
import { ThemeModule } from 'src/app/@theme/theme.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NbCardModule,
    ThemeModule,
  ]
})
export class HomeModule { }
