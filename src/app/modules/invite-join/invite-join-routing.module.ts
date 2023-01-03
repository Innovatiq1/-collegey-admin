import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Load Componets

import { AddInviteComponent } from './add-invite/add-invite.component';
import { ViewInviteComponent } from './view-invite/view-invite.component';

const routes: Routes = [
  {
    path: '',
    component: ViewInviteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InviteJoinRoutingModule { }
