import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { MaterialModule } from 'src/app/material/material.module';
import { PipeModule } from 'src/app/shared/pipe.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { AnnouncementRoutingModule } from './announcement-routing.module';
import { NewAnnouncementComponent } from './new-announcement/new-announcement.component';
import { ListAnnouncementComponent } from './list-announcement/list-announcement.component';


@NgModule({
  declarations: [NewAnnouncementComponent, ListAnnouncementComponent],
  imports: [
    CommonModule,
    AnnouncementRoutingModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    PipeModule,
    ThemeModule,
  ]
})
export class AnnouncementModule { }
