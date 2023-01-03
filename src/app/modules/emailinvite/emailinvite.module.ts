import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { NgantdModule } from 'src/app/ngantd/ngantd.module';
import { InviteListingComponent } from './invite-listing/invite-listing.component';
import { AddInviteComponent } from './add-invite/add-invite.component';
import { EmailinviteRoutingModule } from './emailinvite-routing.module';
import { NzDropDownModule, NzFormModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [AddInviteComponent,EmailinviteRoutingModule.components],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ThemeModule,
    EmailinviteRoutingModule
  ]
})
export class EmailinviteModule { }
