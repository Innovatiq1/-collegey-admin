import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollegeyAcademyListComponent } from './collegey-academy-list/collegey-academy-list.component';
import { CollegeyAcademyComponent } from './collegey-academy/collegey-academy.component';
import { CollegeyAnswerListComponent } from './collegey-answer-list/collegey-answer-list.component';
import { CollegeyGroupListComponent } from './collegey-group-list/collegey-group-list.component';
import { CollegeyGroupPostComponent } from './collegey-group-post/collegey-group-post.component';
import { CollegeyQuestionListComponent } from './collegey-question-list/collegey-question-list.component';

import { FeedListComponent } from './feed-list/feed-list.component';


const routes: Routes = [
  {
    path: 'collegey-feeds',
    component: FeedListComponent,
  },
  {
    path: 'collegey-academy-list',
    component: CollegeyAcademyListComponent,
  },
  {
    path: 'collegey-question-list',
    component: CollegeyQuestionListComponent,
  },
  {
    path: 'collegey-answer-list/:id',
    component: CollegeyAnswerListComponent,
  },
  {
    path: 'collegey-group-list',
    component: CollegeyGroupListComponent,
  },
  {
    path: 'collegey-group-post/:id',
    component: CollegeyGroupPostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedsRoutingModule {
  static components = [
    FeedListComponent
  ];
 }
