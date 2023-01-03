import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorRoutingModule } from './mentor-routing.module';
import { MentorComponent } from './mentor.component';
import { AddMentorsComponent } from './add-mentors/add-mentors.component';
import { MentorDetailComponent } from './mentor-detail/mentor-detail.component';
import { MentorListingComponent } from './mentor-listing/mentor-listing.component';
import { ShowMentorInformationComponent } from './show-mentor-information/show-mentor-information.component';


@NgModule({
  declarations: [ShowMentorInformationComponent],
  imports: [
    CommonModule,
    MentorRoutingModule
  ]
})
export class MentorModule { }
