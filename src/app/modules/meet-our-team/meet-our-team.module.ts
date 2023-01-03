import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetOurTeamRoutingModule } from './meet-our-team-routing.module';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { MaterialModule } from 'src/app/material/material.module';
import { PipeModule } from 'src/app/shared/pipe.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MotTitleComponent } from './mot-title/mot-title.component';
import { MotTitleListComponent } from './mot-title-list/mot-title-list.component';
import { TeamMemberListComponent } from './team-member-list/team-member-list.component';
import { TeamMemberComponent } from './team-member/team-member.component';


@NgModule({
  declarations: [MotTitleComponent, MotTitleListComponent, TeamMemberListComponent, TeamMemberComponent],
  imports: [
    CommonModule,
    MeetOurTeamRoutingModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    PipeModule,
    ThemeModule,
  ]
})
export class MeetOurTeamModule { }
