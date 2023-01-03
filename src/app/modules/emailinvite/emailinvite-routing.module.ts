import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddInviteComponent } from './add-invite/add-invite.component';
import { EmailinviteComponent } from './emailinvite.component';
import { InviteListingComponent } from './invite-listing/invite-listing.component';



const routes: Routes = [ 
  {
    path: '',
    component: EmailinviteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailinviteRoutingModule {
  static components = [
    EmailinviteComponent,
    InviteListingComponent
  ];
}
