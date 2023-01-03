import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MentorListingComponent } from './mentor/mentor-listing/mentor-listing.component';
import { MentorComponent } from './mentor/mentor.component';
import { ParentListingComponent } from './parent/parent-listing/parent-listing.component';
import { ParentComponent } from './parent/parent.component';
import { CounsellorComponent } from './counsellor/counsellor.component';
import { CounsellorListingComponent } from './counsellor/counsellor-listing/counsellor-listing.component';
import { AdminComponent } from './admin/admin.component';
import { AdminListingComponent } from './admin/admin-listing/admin-listing.component';
import { AlumniComponent } from './alumni/alumni.component';
import { AlumniListingComponent } from './alumni/alumni-listing/alumni-listing.component';
import { AllusersComponent } from './allusers/allusers.component';
import { AlluserListingComponent } from './allusers/alluser-listing/alluser-listing.component';
import { StudentNzListingComponent } from './student-nz/student-nz-listing/student-nz-listing.component';
import { StudentNzComponent } from './student-nz/student-nz.component';
import { ImpactProfileNzComponent } from './impact-profile-nz/impact-profile-nz.component';
import { ImpactPartnerNzListingComponent } from './impact-profile-nz/impact-partner-nz-listing/impact-partner-nz-listing.component';
import { SchoolPartnerNzListingComponent } from './school-partner-nz/school-partner-nz-listing/school-partner-nz-listing.component';
import { SchoolPartnerNzComponent } from './school-partner-nz/school-partner-nz.component';
import { UniversityPartnerNzListingComponent } from './university-partner-nz/university-partner-nz-listing/university-partner-nz-listing.component';
import { UniversityPartnerNzComponent } from './university-partner-nz/university-partner-nz.component';
import { AddDefaultBannerComponent } from './add-default-banner/add-default-banner.component';
import { ProfileBannerComponent } from './profile-banner/profile-banner.component';
import { MentorProjectBannerComponent } from './mentor-project-banner/mentor-project-banner.component';
import { StudentProjectBannerComponent } from './student-project-banner/student-project-banner.component';
import { ViewUserRewardComponent } from './view-user-reward/view-user-reward.component';
import { AddRewardRedeemedSettingComponent } from './add-reward-redeemed-setting/add-reward-redeemed-setting.component';
import { ViewRewardRedeemedSettingComponent } from './view-reward-redeemed-setting/view-reward-redeemed-setting.component';



@NgModule({
  declarations: [UserRoutingModule.usersComponents,MentorListingComponent,MentorComponent,
    ParentListingComponent,ParentComponent,CounsellorComponent,CounsellorListingComponent,AdminComponent,AdminListingComponent
  ,AlumniComponent,AlumniListingComponent,AllusersComponent,AlluserListingComponent, StudentNzListingComponent,StudentNzComponent,
  ImpactProfileNzComponent,ImpactPartnerNzListingComponent,SchoolPartnerNzComponent,SchoolPartnerNzListingComponent,UniversityPartnerNzComponent,UniversityPartnerNzListingComponent, AddDefaultBannerComponent, ProfileBannerComponent, MentorProjectBannerComponent, StudentProjectBannerComponent, ViewUserRewardComponent, AddRewardRedeemedSettingComponent, ViewRewardRedeemedSettingComponent,],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    SharedModule,
  ]
})
export class UserModule { }
