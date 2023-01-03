import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Load Components
import { ViewForgetPasswordTemplateComponent } from './view-forget-password-template/view-forget-password-template.component';
import { ViewWelcomeMailTemplateComponent } from './view-welcome-mail-template/view-welcome-mail-template.component';
import { ViewMentorRequestTemplateComponent } from './view-mentor-request-template/view-mentor-request-template.component';
import { StudentProjectApprovalTemplateComponent } from './student-project-approval-template/student-project-approval-template.component';
import { StudentProjectRejectTemplateComponent } from './student-project-reject-template/student-project-reject-template.component';
import { ViewNewProjectTemplateComponent } from './view-new-project-template/view-new-project-template.component';
import { ViewInviteUserRejectTemplateComponent } from './view-invite-user-reject-template/view-invite-user-reject-template.component';
import { ViewMemberRefferedTemplateComponent } from './view-member-reffered-template/view-member-reffered-template.component';
import { ViewNewMenterContactTemplateComponent } from './view-new-menter-contact-template/view-new-menter-contact-template.component';
import { ViewStudentProjectApprovalInviteComponent } from './view-student-project-approval-invite/view-student-project-approval-invite.component';
import { ViewProjectRefferalInviteComponent } from './view-project-refferal-invite/view-project-refferal-invite.component';
import { ViewMentorRequestSubmitComponent } from './view-mentor-request-submit/view-mentor-request-submit.component';
import { ViewFreeProjectJoiningComponent } from './view-free-project-joining/view-free-project-joining.component';
import { ViewCompletedProjectTemplateComponent } from './view-completed-project-template/view-completed-project-template.component';
import { ViewInviteProjectMemberComponent } from './view-invite-project-member/view-invite-project-member.component';
import { ViewInviteNewProjectMemberComponent } from './view-invite-new-project-member/view-invite-new-project-member.component';
import { ViewNewInvitationFriendComponent } from './view-new-invitation-friend/view-new-invitation-friend.component';
import { ViewMentorProjectInviteComponent } from './view-mentor-project-invite/view-mentor-project-invite.component';
import { ViewMentorAcceptProjectInviteStatusComponent } from './view-mentor-accept-project-invite-status/view-mentor-accept-project-invite-status.component';
import { ViewNewWaitlistComponent } from './view-new-waitlist/view-new-waitlist.component';
import { ViewSendProjectInvoiceComponent } from './view-send-project-invoice/view-send-project-invoice.component';
import { ViewAdminEmailTemplateComponent } from './view-admin-email-template/view-admin-email-template.component';
import { ViewAdminEmailComponent } from './view-admin-email/view-admin-email.component'; 




const routes: Routes = [
  {
    path: 'forget-password-tempt',
    component: ViewForgetPasswordTemplateComponent,
  },
  {
    path: 'welcome-mail-tempt',
    component: ViewWelcomeMailTemplateComponent,
  },
  {
    path: 'mentor-request-tempt',
    component: ViewMentorRequestTemplateComponent,
  },
  {
    path: 'student-project-approval',
    component: StudentProjectApprovalTemplateComponent,
  },
  {
    path: 'student-project-reject',
    component: StudentProjectRejectTemplateComponent,
  },
  {
    path: 'new-project-tempt',
    component: ViewNewProjectTemplateComponent,
  },
  {
    path: 'Invite-usr-reject-tempt',
    component: ViewInviteUserRejectTemplateComponent,
  },
  {
    path: 'new-member-referred-tempt',
    component: ViewMemberRefferedTemplateComponent,
  },
  {
    path: 'new-mentor-contact-collegey',
    component: ViewNewMenterContactTemplateComponent,
  },
  {
    path: 'student-project-approval-invite',
    component: ViewStudentProjectApprovalInviteComponent,
  },
  {
    path: 'project-referral-invite',
    component: ViewProjectRefferalInviteComponent,
  },
  {
    path: 'mentor-request-submit',
    component: ViewMentorRequestSubmitComponent,
  },
  {
    path: 'free-project-joining',
    component: ViewFreeProjectJoiningComponent,
  },
  {
    path: 'completed-project-template',
    component: ViewCompletedProjectTemplateComponent,
  },
  {
    path: 'invite-project-member',
    component: ViewInviteProjectMemberComponent,
  },
  {
    path: 'invite-project-new-member',
    component: ViewInviteNewProjectMemberComponent,
  },
  {
    path: 'new-invitation-friend',
    component: ViewNewInvitationFriendComponent,
  },
  {
    path: 'mentor-project-invite',
    component: ViewMentorProjectInviteComponent,
  },
  {
    path: 'mentor-accept-project-invite-status',
    component: ViewMentorAcceptProjectInviteStatusComponent,
  },
  {
    path: 'new-waitlist',
    component: ViewNewWaitlistComponent,
  },
  {
    path: 'send-project-invoice',
    component: ViewSendProjectInvoiceComponent,
  },
  {
    path: 'admin_email_template',
    component: ViewAdminEmailTemplateComponent,
  },
  {
    path: 'admin_email',
    component: ViewAdminEmailComponent,
  },


  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailConfigurationRoutingModule { }
