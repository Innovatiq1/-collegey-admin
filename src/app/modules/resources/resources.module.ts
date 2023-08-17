import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourcesRoutingModule } from './resources-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { PipeModule } from 'src/app/shared/pipe.module';
import { FormsModule } from '@angular/forms';
import { BlogsListingComponent } from './blogs/blogs-listing/blogs-listing.component';
import { AddWebinarComponent } from './webinars/add-webinar/add-webinar.component';
import { WebinarsListingComponent } from './webinars/webinars-listing/webinars-listing.component';
import { ProgrammesListingComponent } from './programmes/programmes-listing/programmes-listing.component';
import { AddProgrammesComponent } from './programmes/add-programmes/add-programmes.component';
import { ProgrammeDetailsComponent } from './programmes/programme-details/programme-details.component';
import { AddConferenceComponent } from './conferences/add-conference/add-conference.component';
import { ConferenceListingComponent } from './conferences/conference-listing/conference-listing.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { FaqsComponent } from './faqs/faqs.component';
import { TeamComponent } from './team/team.component';
import { SdgComponent } from './sdg/sdg.component';
import { FaqListingComponent } from './faqs/faq-listing/faq-listing.component';
import { FaqCategoryListingComponent } from './faqs/faq-category-listing/faq-category-listing.component';
import { AddFaqComponent } from './faqs/add-faq/add-faq.component';
import { TeamListingComponent } from './team/team-listing/team-listing.component';
import { AddTeamComponent } from './team/add-team/add-team.component';
import { ReviewModule } from './review/review.module';
import { BoardofDirectorsListingComponent } from './team/boardof-directors-listing/boardof-directors-listing.component';
import { AddBoardofDirectorsComponent } from './team/add-boardof-directors/add-boardof-directors.component';
import { AddBoardofAdvisorsComponent } from './team/add-boardof-advisors/add-boardof-advisors.component';
import { BoardofAdvisorsListingComponent } from './team/boardof-advisors-listing/boardof-advisors-listing.component';
import { CollegeyFundComponent } from './collegey-fund/collegey-fund.component';
import { LogoUploadComponent } from './logo-upload/logo-upload.component';
import { CollegeyLogoComponent } from './logo-upload/collegey-logo/collegey-logo.component';
import { UniversityLogoComponent } from './logo-upload/university-logo/university-logo.component';
import { AddLogoUploadComponent } from './logo-upload/add-logo-upload/add-logo-upload.component';
import { AddUniversityLogoComponent } from './logo-upload/add-university-logo/add-university-logo.component';
import { AddCollegeyLogoComponent } from './logo-upload/add-collegey-logo/add-collegey-logo.component';
import { BadgeListingComponent } from './badge-listing/badge-listing.component';
import { AddBadgeComponent } from './badge-listing/add-badge/add-badge.component';
import { ActiveCoursesComponent } from './active-courses/active-courses.component';
import { AddCoursesComponent } from './active-courses/add-courses/add-courses.component';
import { CourseDetailsComponent } from './active-courses/course-details/course-details.component';
import { CourseListingComponent } from './active-courses/course-listing/course-listing.component';
import { AssignBadgeComponent } from './badge-listing/assign-badge/assign-badge.component';
import { AddAssignBadgeComponent } from './badge-listing/add-assign-badge/add-assign-badge.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AddStudentResourceComponent } from './add-student-resource/add-student-resource.component';
import { ViewStudentResourceComponent } from './view-student-resource/view-student-resource.component';
import { AddStudentArticleComponent } from './add-student-article/add-student-article.component';
import { ViewStudentArticleComponent } from './view-student-article/view-student-article.component';
import { AddCuratedResourceComponent } from './add-curated-resource/add-curated-resource.component';
import { ViewCuratedResourceComponent } from './view-curated-resource/view-curated-resource.component';
import { AddStudentFileComponent } from './add-student-file/add-student-file.component';
import { ListStudentFileComponent } from './list-student-file/list-student-file.component';
import { FaqCategoryComponent } from './faqs/faq-category/faq-category.component';
import { CollegeyPartnerComponent } from './collegey-partner/collegey-partner.component';
import { CollegeyCareersComponent } from './collegey-careers/collegey-careers.component';
import { NewsletterListComponent } from './newsletter-list/newsletter-list.component';
import { UniversityComponent } from './university/university/university.component';
import { NewUniversityComponent } from './university/new-university/new-university/new-university.component';



@NgModule({
  declarations: [
    ResourcesRoutingModule.components,
    WebinarsListingComponent,
    AddWebinarComponent,
    BlogsListingComponent,
    ProgrammesListingComponent,
    AddProgrammesComponent,
    ProgrammeDetailsComponent,
    AddConferenceComponent,
    ConferenceListingComponent,
    FaqsComponent,
    TeamComponent,
    SdgComponent,
    FaqListingComponent,
    AddFaqComponent,
    TeamListingComponent,
    AddTeamComponent,
    BoardofDirectorsListingComponent,
    AddBoardofDirectorsComponent,
    AddBoardofAdvisorsComponent,
    BoardofAdvisorsListingComponent,
    CollegeyFundComponent,
    LogoUploadComponent,
    CollegeyLogoComponent,
    UniversityLogoComponent,
    AddLogoUploadComponent,
    AddUniversityLogoComponent,
    AddCollegeyLogoComponent,
    BadgeListingComponent,
    AddBadgeComponent,
    ActiveCoursesComponent,
    AddCoursesComponent,
    CourseDetailsComponent,
    CourseListingComponent,
    AssignBadgeComponent,
    AddAssignBadgeComponent,
    AddStudentResourceComponent,
    ViewStudentResourceComponent,
    AddStudentArticleComponent,
    ViewStudentArticleComponent,
    AddCuratedResourceComponent,
    ViewCuratedResourceComponent,
    AddStudentFileComponent,
    ListStudentFileComponent,
    FaqCategoryComponent,
    FaqCategoryListingComponent,
    CollegeyPartnerComponent,
    CollegeyCareersComponent,
    NewsletterListComponent,
    UniversityComponent,
    NewUniversityComponent
  ],
  imports: [
    CommonModule,
    ResourcesRoutingModule,
    NgMultiSelectDropDownModule,
    ReviewModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    PipeModule,
    ThemeModule
  ],
})
export class ResourcesModule { }
