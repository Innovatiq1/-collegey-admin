import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollegeyAtCareerRoutingModule } from './collegey-at-career-routing.module';
import { CareerAtComponent } from './career-at/career-at.component';
import { CareerAtListComponent } from './career-at-list/career-at-list.component';

import { FormsModule } from '@angular/forms';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { MaterialModule } from 'src/app/material/material.module';
import { PipeModule } from 'src/app/shared/pipe.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CareerAtComponent, CareerAtListComponent],
  imports: [
    CommonModule,
    CollegeyAtCareerRoutingModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    PipeModule,
    ThemeModule,
  ]
})
export class CollegeyAtCareerModule { }
