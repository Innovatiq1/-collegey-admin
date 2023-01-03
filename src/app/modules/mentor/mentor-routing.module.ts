import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MentorPerksComponent } from './mentor-perks/mentor-perks.component';
import { MentorResourcesComponent } from './mentor-resources/mentor-resources.component';
import { ViewmentorResourcesComponent } from './viewmentor-resources/viewmentor-resources.component';
import { ViewMentorarticleComponent } from './view-mentorarticle/view-mentorarticle.component';
import { AddMentorarticleComponent } from './add-mentorarticle/add-mentorarticle.component';
import { CollegeyOpportunitiesComponent } from './collegey-opportunities/collegey-opportunities.component';
import { AddMentorfileComponent } from './add-mentorfile/add-mentorfile.component';
import { ListMentorfileComponent } from './list-mentorfile/list-mentorfile.component';
import { ViewCuratedresourceComponent } from './view-curatedresource/view-curatedresource.component';
import { ListMentortestimonialComponent } from './list-mentortestimonial/list-mentortestimonial.component';
import { AgreementTermsConditionComponent } from './agreement-terms-condition/agreement-terms-condition.component';
import { ListAgreementTermsComponent } from './list-agreement-terms/list-agreement-terms.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ViewMentorResourceTitleComponent } from './view-mentor-resource-title/view-mentor-resource-title.component';


const routes: Routes = [
  {
    path: 'mentor-perks',
    component: MentorPerksComponent,
  },
  {
    path: 'mentor-resources',
    component: ViewmentorResourcesComponent,
  },
  {
    path: 'mentor-article',
    component: ViewMentorarticleComponent,
  },
  {
    path: 'curated-resources',
    component: ViewCuratedresourceComponent,
  },
  {
    path: 'collegey-opportunities',
    component: CollegeyOpportunitiesComponent,
  },
  {
    path: 'mentor-file',
    component: ListMentorfileComponent,
  },
  {
    path: 'mentor-testimonial',
    component: ListMentortestimonialComponent,
  },
  {
    path: 'agreement-condition',
    component: ListAgreementTermsComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'resources-title',
    component: ViewMentorResourceTitleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MentorsRoutingModule {
  static components = [MentorPerksComponent];
}
