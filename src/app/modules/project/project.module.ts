import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { ProjectRoutingModule } from './project-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { AddProjectComponent } from './add-project/add-project.component';
import { OnGoingProjectComponent } from './on-going-project/on-going-project.component';
import { OrderedListComponent } from './ordered-list/ordered-list.component';
import { StudentProjectComponent } from './student-project/student-project.component';
import { AddStudentprojectComponent } from './add-studentproject/add-studentproject.component';
import { MentorProjectComponent } from './mentor-project/mentor-project.component';
import { AddMentorprojectComponent } from './add-mentorproject/add-mentorproject.component';
import { AddProjectFeesComponent } from './add-project-fees/add-project-fees.component';
import { ListProjectFeesComponent } from './list-project-fees/list-project-fees.component';

@NgModule({
  declarations: [ProjectRoutingModule.components, AddProjectComponent, OnGoingProjectComponent, OrderedListComponent, StudentProjectComponent, AddStudentprojectComponent, MentorProjectComponent, AddMentorprojectComponent, AddProjectFeesComponent, ListProjectFeesComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    SharedModule,
    MaterialModule
  ]
})

export class ProjectModule { }
