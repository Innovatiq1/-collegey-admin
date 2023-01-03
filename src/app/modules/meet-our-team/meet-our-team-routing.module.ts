import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MotTitleListComponent } from './mot-title-list/mot-title-list.component';
import { MotTitleComponent } from './mot-title/mot-title.component';
import { TeamMemberListComponent } from './team-member-list/team-member-list.component';


const routes: Routes = [
  {
    path: 'team-title',
    component: MotTitleComponent,
  },
  {
    path: 'team-title-list',
    component: MotTitleListComponent,
  },
  {
    path: 'team-member-list',
    component: TeamMemberListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetOurTeamRoutingModule { 
  static components = [
    MotTitleComponent
  ];
}
