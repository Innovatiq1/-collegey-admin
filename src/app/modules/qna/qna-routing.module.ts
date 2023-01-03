import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QnaListComponent } from './qna-list/qna-list.component';
// import { ViewQnaComponent } from './view-qna/view-qna.component';

const routes: Routes = [
  {
    path: 'qna-list',
    component: QnaListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QnaRoutingModule { 
  static components = [
    QnaListComponent,
    // ViewQnaComponent
  ];
}
