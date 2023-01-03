import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListingComponent } from './project-listing/project-listing.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectComponent } from './project.component';
import { OnGoingProjectComponent } from './on-going-project/on-going-project.component';
import { OrderedListComponent } from './ordered-list/ordered-list.component';
import { StudentProjectComponent } from './student-project/student-project.component';
import { MentorProjectComponent } from './mentor-project/mentor-project.component';
import { AddMentorprojectComponent } from './add-mentorproject/add-mentorproject.component';
import { ListProjectFeesComponent } from './list-project-fees/list-project-fees.component';

const routes: Routes = [ 
  {
    path: '',
    component: ProjectComponent,
  },
  {
    path: 'project/:id',
    component: ProjectDetailComponent,
  },
  {
    path: 'ongoing-project',
    component: OnGoingProjectComponent,
  },
  {
    path: 'student-project',
    component: StudentProjectComponent,
  },
  {
    path: 'mentor-project',
    component: MentorProjectComponent,
  },
  {
    path: 'ordered-project',
    component: OrderedListComponent,
  },
  {
    path: 'fees',
    component: ListProjectFeesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {
  static components = [
    ProjectComponent,
    ProjectListingComponent,
    ProjectDetailComponent
  ];
}
