import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAnnouncementComponent } from './list-announcement/list-announcement.component';
import { NewAnnouncementComponent } from './new-announcement/new-announcement.component';

const routes: Routes = [
  {
    path: 'new-announcement',
    component: NewAnnouncementComponent,
  },
  {
    path: 'list-announcement',
    component: ListAnnouncementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementRoutingModule { 
  static components = [
    ListAnnouncementComponent,
    NewAnnouncementComponent
  ];
}
