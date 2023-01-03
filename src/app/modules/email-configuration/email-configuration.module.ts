import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

import { EmailConfigurationRoutingModule } from './email-configuration-routing.module';
import { AddForgetPasswordTemplateComponent } from './add-forget-password-template/add-forget-password-template.component';
import { ViewForgetPasswordTemplateComponent } from './view-forget-password-template/view-forget-password-template.component';
import { AddWelcomeMailTemplateComponent } from './add-welcome-mail-template/add-welcome-mail-template.component';
import { ViewWelcomeMailTemplateComponent } from './view-welcome-mail-template/view-welcome-mail-template.component';
import { AddMentorRequestTemplateComponent } from './add-mentor-request-template/add-mentor-request-template.component';
import { ViewMentorRequestTemplateComponent } from './view-mentor-request-template/view-mentor-request-template.component';
import { StudentProjectApprovalTemplateComponent } from './student-project-approval-template/student-project-approval-template.component';
import { AddStudentProjectApprovalTemplateComponent } from './add-student-project-approval-template/add-student-project-approval-template.component';
import { StudentProjectRejectTemplateComponent } from './student-project-reject-template/student-project-reject-template.component';
import { AddStudentProjectRejectTemplateComponent } from './add-student-project-reject-template/add-student-project-reject-template.component';
import { ViewNewProjectTemplateComponent } from './view-new-project-template/view-new-project-template.component';
import { AddNewProjectTemplateComponent } from './add-new-project-template/add-new-project-template.component';
import { ViewInviteUserRejectTemplateComponent } from './view-invite-user-reject-template/view-invite-user-reject-template.component';
import { AddInviteUserRejectTemplateComponent } from './add-invite-user-reject-template/add-invite-user-reject-template.component';
import { ViewMemberRefferedTemplateComponent } from './view-member-reffered-template/view-member-reffered-template.component';
import { AddMemberRefferedTemplateComponent } from './add-member-reffered-template/add-member-reffered-template.component';
import { ViewNewMenterContactTemplateComponent } from './view-new-menter-contact-template/view-new-menter-contact-template.component';
import { AddNewMenterContactTemplateComponent } from './add-new-menter-contact-template/add-new-menter-contact-template.component';
import { ViewStudentProjectApprovalInviteComponent } from './view-student-project-approval-invite/view-student-project-approval-invite.component';
import { AddStudentProjectApprovalInviteComponent } from './add-student-project-approval-invite/add-student-project-approval-invite.component';
import { ViewProjectRefferalInviteComponent } from './view-project-refferal-invite/view-project-refferal-invite.component';
import { AddProjectRefferalInviteComponent } from './add-project-refferal-invite/add-project-refferal-invite.component';
import { ViewMentorRequestSubmitComponent } from './view-mentor-request-submit/view-mentor-request-submit.component';
import { AddMentorRequestSubmitComponent } from './add-mentor-request-submit/add-mentor-request-submit.component';
import { ViewFreeProjectJoiningComponent } from './view-free-project-joining/view-free-project-joining.component';
import { AddFreeProjectJoininggComponent } from './add-free-project-joiningg/add-free-project-joiningg.component';
import { AddCompletedProjectTemplateComponent } from './add-completed-project-template/add-completed-project-template.component';
import { ViewCompletedProjectTemplateComponent } from './view-completed-project-template/view-completed-project-template.component';
import { ViewInviteProjectMemberComponent } from './view-invite-project-member/view-invite-project-member.component';
import { AddInviteProjectMemberComponent } from './add-invite-project-member/add-invite-project-member.component';
import { ViewInviteNewProjectMemberComponent } from './view-invite-new-project-member/view-invite-new-project-member.component';
import { AddInviteNewProjectMemberComponent } from './add-invite-new-project-member/add-invite-new-project-member.component';
import { ViewNewInvitationFriendComponent } from './view-new-invitation-friend/view-new-invitation-friend.component';
import { AddNewInvitationFriendComponent } from './add-new-invitation-friend/add-new-invitation-friend.component';
import { ViewMentorProjectInviteComponent } from './view-mentor-project-invite/view-mentor-project-invite.component';
import { AddMentorProjectInviteComponent } from './add-mentor-project-invite/add-mentor-project-invite.component';
import { AddMentorAcceptProjectInviteStatusComponent } from './add-mentor-accept-project-invite-status/add-mentor-accept-project-invite-status.component';
import { ViewMentorAcceptProjectInviteStatusComponent } from './view-mentor-accept-project-invite-status/view-mentor-accept-project-invite-status.component';
import { ViewNewWaitlistComponent } from './view-new-waitlist/view-new-waitlist.component';
import { AddNewWaitlistComponent } from './add-new-waitlist/add-new-waitlist.component';
import { ViewSendProjectInvoiceComponent } from './view-send-project-invoice/view-send-project-invoice.component';
import { AddSendProjectInvoiceComponent } from './add-send-project-invoice/add-send-project-invoice.component';
import { ViewAdminEmailTemplateComponent } from './view-admin-email-template/view-admin-email-template.component';
import { AddAdminEmailTemplateComponent } from './add-admin-email-template/add-admin-email-template.component';
import { ViewAdminEmailComponent } from './view-admin-email/view-admin-email.component';
import { AddAdminEmailComponent } from './add-admin-email/add-admin-email.component';




@NgModule({
  declarations: [AddForgetPasswordTemplateComponent, ViewForgetPasswordTemplateComponent, AddWelcomeMailTemplateComponent, ViewWelcomeMailTemplateComponent, AddMentorRequestTemplateComponent, ViewMentorRequestTemplateComponent, StudentProjectApprovalTemplateComponent, AddStudentProjectApprovalTemplateComponent, StudentProjectRejectTemplateComponent, AddStudentProjectRejectTemplateComponent, ViewNewProjectTemplateComponent, AddNewProjectTemplateComponent, ViewInviteUserRejectTemplateComponent, AddInviteUserRejectTemplateComponent, ViewMemberRefferedTemplateComponent, AddMemberRefferedTemplateComponent, ViewNewMenterContactTemplateComponent, AddNewMenterContactTemplateComponent, ViewStudentProjectApprovalInviteComponent, AddStudentProjectApprovalInviteComponent, ViewProjectRefferalInviteComponent, AddProjectRefferalInviteComponent, ViewMentorRequestSubmitComponent, AddMentorRequestSubmitComponent, ViewFreeProjectJoiningComponent, AddFreeProjectJoininggComponent, AddCompletedProjectTemplateComponent, ViewCompletedProjectTemplateComponent, ViewInviteProjectMemberComponent, AddInviteProjectMemberComponent, ViewInviteNewProjectMemberComponent, AddInviteNewProjectMemberComponent, ViewNewInvitationFriendComponent, AddNewInvitationFriendComponent, ViewMentorProjectInviteComponent, AddMentorProjectInviteComponent, AddMentorAcceptProjectInviteStatusComponent, ViewMentorAcceptProjectInviteStatusComponent, ViewNewWaitlistComponent, AddNewWaitlistComponent, ViewSendProjectInvoiceComponent, AddSendProjectInvoiceComponent
  ,ViewAdminEmailTemplateComponent,AddAdminEmailTemplateComponent, ViewAdminEmailComponent, AddAdminEmailComponent],
  imports: [
    CommonModule,
    EmailConfigurationRoutingModule,
    SharedModule,
    FormsModule,
    MaterialModule
  ]
})
export class EmailConfigurationModule { }
