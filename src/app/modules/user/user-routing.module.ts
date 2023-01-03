import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { StudentDetailsComponent } from './students/student-details/student-details.component';
import { ImpactPartnerComponent } from './impact-partner/impact-partner.component';
import { ImpactPartnerDetailsComponent } from './impact-partner/impact-partner-details/impact-partner-details.component';
import { UniversityPartnerComponent } from './university-partner/university-partner.component';
import { UniversityPartnerDetailsComponent } from './university-partner/university-partner-details/university-partner-details.component';
import { SchoolPartnerComponent } from './school-partner/school-partner.component';
import { SchoolPartnerDetailsComponent } from './school-partner/school-partner-details/school-partner-details.component';
import { MentorComponent } from './mentor/mentor.component';
import { AdminComponent } from './admin/admin.component';
import { CounsellorComponent } from './counsellor/counsellor.component';
import { ParentComponent } from './parent/parent.component';
import { AlumniComponent } from './alumni/alumni.component';
import { AllusersComponent } from './allusers/allusers.component';
import { StudentNzComponent } from './student-nz/student-nz.component';
import { ImpactProfileNzComponent } from './impact-profile-nz/impact-profile-nz.component';
import { SchoolPartnerNzComponent } from './school-partner-nz/school-partner-nz.component';
import { UniversityPartnerNzComponent } from './university-partner-nz/university-partner-nz.component';
import { AddDefaultBannerComponent } from './add-default-banner/add-default-banner.component';
import { ProfileBannerComponent } from './profile-banner/profile-banner.component';
import { MentorProjectBannerComponent } from './mentor-project-banner/mentor-project-banner.component';
import { StudentProjectBannerComponent } from './student-project-banner/student-project-banner.component';
import { ViewUserRewardComponent } from './view-user-reward/view-user-reward.component';
import { ViewRewardRedeemedSettingComponent } from './view-reward-redeemed-setting/view-reward-redeemed-setting.component';

const routes: Routes = [
  {
    path: 'students',
    component: StudentsComponent
  },
  {
    path: 'students/:id',
    component: StudentDetailsComponent,
    loadChildren: () => import('./students/students.module').then(m => m.StudentsModule),
  },
  {
    path: 'impact-partner',
    component: ImpactPartnerComponent
  },
  {
    path: 'impact-partner/:id',
    component: ImpactPartnerDetailsComponent,
    loadChildren: () => import('./impact-partner/impact-partner.module').then(m => m.ImpactPartnerModule),
  },
  {
    path: 'university-partner',
    component: UniversityPartnerComponent,
  },
  {
    path: 'university-partner/:id',
    component: UniversityPartnerDetailsComponent,
    loadChildren: () => import('./university-partner/university-partner.module').then(m => m.UniversityPartnerModule),
  },
  {
    path: 'school-partner',
    component: SchoolPartnerComponent,
  },
  {
    path: 'school-partner/:id',
    component: SchoolPartnerDetailsComponent,
    loadChildren: () => import('./school-partner/school-partner.module').then(m => m.SchoolPartnerModule),
  },
  {
    path: 'mentor',
    component: MentorComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'counsellor',
    component: CounsellorComponent,
  },
  {
    path: 'parent',
    component: ParentComponent,
  },
  {
    path: 'alumni',
    component: AlumniComponent,
  },
  {
    path: 'allusers',
    component: AllusersComponent,
  },
  {
    path: 'student',
    component: StudentNzComponent,
  },
  {
    path: 'impact-partners',
    component: ImpactProfileNzComponent,
  },
  {
    path: 'school',
    component: SchoolPartnerNzComponent,
  },
  {
    path: 'university',
    component: UniversityPartnerNzComponent,
  },
  {
    path: 'add-banner',
    component: AddDefaultBannerComponent,
  },
  {
    path: 'profile-banner',
    component: ProfileBannerComponent,
  },
  {
    path: 'mentor-banner',
    component: MentorProjectBannerComponent,
  },
  {
    path: 'student-banner',
    component: StudentProjectBannerComponent,
  },
  {
    path: 'reward/:id',
    component: ViewUserRewardComponent,
  },
  {
    path: 'redeemed-setting',
    component: ViewRewardRedeemedSettingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
  static usersComponents = [
    StudentsComponent,
    StudentDetailsComponent,
    ImpactPartnerComponent,
    ImpactPartnerDetailsComponent,
    UniversityPartnerComponent,
    UniversityPartnerDetailsComponent,
    UniversityPartnerDetailsComponent,
    SchoolPartnerComponent,
    SchoolPartnerDetailsComponent
  ];
 }
