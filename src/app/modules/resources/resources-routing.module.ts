import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogDetailComponent } from './blogs/blog-detail/blog-detail.component';
import { WebinarsComponent } from './webinars/webinars.component';
import { WebinarDetailsComponent } from './webinars/webinar-details/webinar-details.component';
import { ProgrammesComponent } from './programmes/programmes.component';
import { ProgrammeDetailsComponent } from './programmes/programme-details/programme-details.component';
import { ActiveCoursesComponent } from './active-courses/active-courses.component';
import { CourseDetailsComponent } from './active-courses/course-details/course-details.component';
import { ConferencesComponent } from './conferences/conferences.component';
import { ConferenceDetailComponent } from './conferences/conference-detail/conference-detail.component';
import { FaqsComponent } from './faqs/faqs.component';
import { CollegeReviewComponent } from './review/college-review/college-review.component';
import { UserReviewComponent } from './review/user-review/user-review.component';
import { TeamComponent } from './team/team.component';
import { SdgComponent } from './sdg/sdg.component';
import { BoardofAdvisorsListingComponent } from './team/boardof-advisors-listing/boardof-advisors-listing.component';
import { BoardofDirectorsListingComponent } from './team/boardof-directors-listing/boardof-directors-listing.component';
import { CollegeyFundComponent } from './collegey-fund/collegey-fund.component';
import { LogoUploadComponent } from './logo-upload/logo-upload.component';
import { CollegeyLogoComponent } from './logo-upload/collegey-logo/collegey-logo.component';
import { UniversityLogoComponent } from './logo-upload/university-logo/university-logo.component';
import { BadgeListingComponent } from './badge-listing/badge-listing.component';
import { AssignBadgeComponent } from './badge-listing/assign-badge/assign-badge.component';
import { AddStudentResourceComponent } from './add-student-resource/add-student-resource.component';
import { ViewStudentResourceComponent } from './view-student-resource/view-student-resource.component';
import { AddStudentArticleComponent } from './add-student-article/add-student-article.component';
import { ViewStudentArticleComponent } from './view-student-article/view-student-article.component';
import { ViewCuratedResourceComponent } from './view-curated-resource/view-curated-resource.component';
import { AddStudentFileComponent } from './add-student-file/add-student-file.component';
import { ListStudentFileComponent } from './list-student-file/list-student-file.component';
import { FaqCategoryComponent } from './faqs/faq-category/faq-category.component';
import { FaqCategoryListingComponent } from './faqs/faq-category-listing/faq-category-listing.component';
import { CollegeyPartnerComponent } from './collegey-partner/collegey-partner.component';
import { CollegeyCareersComponent } from './collegey-careers/collegey-careers.component';
import { NewsletterListComponent } from './newsletter-list/newsletter-list.component';

const routes: Routes = [
  {
    path: 'blogs',
    component: BlogsComponent,
  },
  {
    path: 'blogs/:id',
    component: BlogDetailComponent,
  },
  {
    path: 'webinars',
    component: WebinarsComponent,
  },
  {
    path: 'webinars/:id',
    component: WebinarDetailsComponent,
  },
  {
    path: 'programmes',
    component: ProgrammesComponent,
  },
  {
    path: 'programmes/:id',
    component: ProgrammeDetailsComponent,
  },
  {
    path: 'courses',
    component: ActiveCoursesComponent,
  },
  {
    path: 'courses/:id',
    component: CourseDetailsComponent,
  },
  {
    path: 'conferences',
    component: ConferencesComponent,
  },
  {
    path: 'conferences/:id',
    component: ConferenceDetailComponent,
  },
  {
    path:'faq',
    component: FaqsComponent
  },
  {
    path:'faq/addCategory',
    component: FaqCategoryComponent
  },
  {
    path:'faq/list-category',
    component: FaqCategoryListingComponent
  },
  {
    path:'review/college',
    component:CollegeReviewComponent
  },
  {
    path: 'review/user',
    component: UserReviewComponent
  },
  {
    path: 'team',
    component: TeamComponent
  },
  {
    path: 'board-directors',
    component: BoardofDirectorsListingComponent
  },
  {
    path: 'board-advisors',
    component: BoardofAdvisorsListingComponent
  },
  {
    path: 'collegey-fund',
    component: CollegeyFundComponent
  },
  {
    path: 'collegey-partner',
    component: CollegeyPartnerComponent
  },
  {
    path: 'collegey-careers',
    component: CollegeyCareersComponent
  },
  {
    path: 'logos',
    component: LogoUploadComponent
  },
  {
    path: 'collegelogos',
    component: CollegeyLogoComponent
  },
  {
    path: 'universitylogos',
    component: UniversityLogoComponent
  },
  {
    path: 'badge',
    component: BadgeListingComponent
  },
  {
    path: 'assignbadge',
    component: AssignBadgeComponent
  },
  {
    path: 'sdg',
    component: SdgComponent
  },
  {
    path: 'student-resources',
    component: ViewStudentResourceComponent,
  },
  {
    path: 'student-article',
    component: ViewStudentArticleComponent,
  },
  {
    path: 'curated-resources',
    component: ViewCuratedResourceComponent,
  }, 
  {
    path: 'student-file',
    component: ListStudentFileComponent,
  },
  {
    path: 'newsletter-list',
    component: NewsletterListComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourcesRoutingModule {
  static components = [
    BlogsComponent,
    ProgrammesComponent,
    WebinarsComponent,
    WebinarDetailsComponent,
    ProgrammeDetailsComponent,
    ConferencesComponent,
    ConferenceDetailComponent,
    SdgComponent,
    TeamComponent,
    BoardofAdvisorsListingComponent,
    BoardofDirectorsListingComponent,
    UserReviewComponent,
    CollegeReviewComponent,
    FaqsComponent,
    CollegeyFundComponent,
    LogoUploadComponent,
    CollegeyLogoComponent,
    UniversityLogoComponent,
    BadgeListingComponent,
    AssignBadgeComponent
  ];
}
