import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThemeModule } from 'src/app/@theme/theme.module';

import { InviteJoinRoutingModule } from './invite-join-routing.module';
import { AddInviteComponent } from './add-invite/add-invite.component';
import { ViewInviteComponent } from './view-invite/view-invite.component';


@NgModule({
  declarations: [AddInviteComponent, ViewInviteComponent],
  imports: [
    CommonModule,
    InviteJoinRoutingModule,
    FormsModule,
    SharedModule,
    ThemeModule
  ]
})
export class InviteJoinModule { }
