import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './shared/components/auth-route/auth.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuardService } from './core/guards/role.guard';
import { UnauthorizedUserComponent } from './shared/components/unauthorized-user/unauthorized-user.component';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'page-content',
    component: AuthComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/page-content/page-content.module').then(m => m.PageContentModule)
  },
  {
    path: 'users',
    component: AuthComponent,
    canActivate: [AuthGuard, RoleGuardService],
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'email-configuration',
    component: AuthComponent,
    canActivate: [AuthGuard, RoleGuardService],
    loadChildren: () => import('./modules/email-configuration/email-configuration.module').then(m=> m.EmailConfigurationModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'resources',
    component: AuthComponent,
    loadChildren: () => import('./modules/resources/resources.module').then(m=> m.ResourcesModule)
  },
  {
    path: 'mentor',
    component: AuthComponent,
    canActivate: [AuthGuard, RoleGuardService],
    loadChildren: () => import('./modules/mentor/mentor.module').then(m=> m.MentorModule)
  },
  {
    path: 'project',
    component: AuthComponent,
    canActivate: [AuthGuard, RoleGuardService],
    loadChildren: () => import('./modules/project/project.module').then(m=> m.ProjectModule)
  },
  {
    path: 'invite',
    component: AuthComponent,
    canActivate: [AuthGuard, RoleGuardService],
    loadChildren: () => import('./modules/emailinvite/emailinvite.module').then(m=> m.EmailinviteModule)
  },
  {
    path: 'invite-join',
    component: AuthComponent,
    canActivate: [AuthGuard, RoleGuardService],
    loadChildren: () => import('./modules/invite-join/invite-join.module').then(m=> m.InviteJoinModule)
  },
  {
    path: 'subscription',
    component: AuthComponent,
    canActivate: [AuthGuard, RoleGuardService],
    loadChildren: () => import('./modules/subscriptions/subscription.module').then(m=> m.SubscriptionModule)
  },
  {
    path: 'career',
    component: AuthComponent,
    canActivate: [AuthGuard, RoleGuardService],
    loadChildren: () => import('./modules/career/career.module').then(m=> m.CareerModule)
  },
  {
    path: 'invest',
    component: AuthComponent,
    canActivate: [AuthGuard, RoleGuardService],
    loadChildren: () => import('./modules/invest/invest.module').then(m=> m.InvestModule)
  },
  {
    path: 'enrollment',
    component: AuthComponent,
    canActivate: [AuthGuard,RoleGuardService],
    loadChildren: () => import('./modules/enrollments/enrollments.module').then(m=>m.EnrollmentsModule)
  },
  {
    path: 'unauthorized-user',
    component: UnauthorizedUserComponent
  },
  {
    path: 'announcement',
    component: AuthComponent,
    canActivate: [AuthGuard, RoleGuardService],
    loadChildren: () => import('./modules/announcement/announcement.module').then(m=> m.AnnouncementModule)
  },
  {
    path: 'agreement',
    component: AuthComponent,
    canActivate: [AuthGuard, RoleGuardService],
    loadChildren: () => import('./modules/agreement-terms/agreement-terms.module').then(m=> m.AgreementTermsModule)
  },
  {
    path: 'feeds',
    component: AuthComponent,
    canActivate: [AuthGuard, RoleGuardService],
    loadChildren: () => import('./modules/feeds/feeds.module').then(m=> m.FeedsModule)
  },
  {
    path: 'meet-our-team',
    component: AuthComponent,
    canActivate: [AuthGuard, RoleGuardService],
    loadChildren: () => import('./modules/meet-our-team/meet-our-team.module').then(m=> m.MeetOurTeamModule)
  },
  {
    path: 'invest-in-collegey',
    component: AuthComponent,
    canActivate: [AuthGuard, RoleGuardService],
    loadChildren: () => import('./modules/collegey-in-invest/collegey-in-invest.module').then(m=> m.CollegeyInInvestModule)
  },
  {
    path: 'fund-in-collegey',
    component: AuthComponent,
    canActivate: [AuthGuard, RoleGuardService],
    loadChildren: () => import('./modules/collegey-in-fund/collegey-in-fund.module').then(m=> m.CollegeyInFundModule)
  },
  {
    path: 'partner-with-collegey',
    component: AuthComponent,
    canActivate: [AuthGuard, RoleGuardService],
    loadChildren: () => import('./modules/collegey-with-partner/collegey-with-partner.module').then(m=> m.CollegeyWithPartnerModule)
  },
  {
    path: 'career-at-collegey',
    component: AuthComponent,
    canActivate: [AuthGuard, RoleGuardService],
    loadChildren: () => import('./modules/collegey-at-career/collegey-at-career.module').then(m=> m.CollegeyAtCareerModule)
  },
  {
    path: 'qna',
    component: AuthComponent,
    canActivate: [AuthGuard, RoleGuardService],
    loadChildren: () => import('./modules/qna/qna.module').then(m=> m.QnaModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, RoleGuardService]
})
export class AppRoutingModule { }
