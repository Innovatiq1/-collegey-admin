import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { MaterialModule } from 'src/app/material/material.module';
import { PipeModule } from 'src/app/shared/pipe.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { FeedsRoutingModule } from './feeds-routing.module';
import { FeedListComponent } from './feed-list/feed-list.component';
import { ViewFeedComponent } from './view-feed/view-feed.component';
import { EditFeedComponent } from './edit-feed/edit-feed.component';
import { CollegeyAcademyComponent } from './collegey-academy/collegey-academy.component';
import { CollegeyAcademyListComponent } from './collegey-academy-list/collegey-academy-list.component';
import { CollegeyQuestionComponent } from './collegey-question/collegey-question.component';
import { CollegeyQuestionListComponent } from './collegey-question-list/collegey-question-list.component';
import { CollegeyAnswerListComponent } from './collegey-answer-list/collegey-answer-list.component';
import { CollegeyGroupListComponent } from './collegey-group-list/collegey-group-list.component';
import { CollegeyGroupPostComponent } from './collegey-group-post/collegey-group-post.component';


@NgModule({
  declarations: [FeedListComponent, ViewFeedComponent, EditFeedComponent, CollegeyAcademyComponent, CollegeyAcademyListComponent, CollegeyQuestionComponent, CollegeyQuestionListComponent, CollegeyAnswerListComponent, CollegeyGroupListComponent, CollegeyGroupPostComponent],
  imports: [
    CommonModule,
    FeedsRoutingModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    PipeModule,
    ThemeModule,
  ]
})
export class FeedsModule { }
