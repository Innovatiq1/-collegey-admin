import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { PipeModule } from 'src/app/shared/pipe.module';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from 'src/app/@theme/theme.module';

import { MentorsRoutingModule } from './mentor-routing.module';
import { MentorResourcesComponent } from './mentor-resources/mentor-resources.component';
import { ViewmentorResourcesComponent } from './viewmentor-resources/viewmentor-resources.component';
import { ViewMentorarticleComponent } from './view-mentorarticle/view-mentorarticle.component';
import { AddMentorarticleComponent } from './add-mentorarticle/add-mentorarticle.component';
import { AddMentorperksComponent } from './add-mentorperks/add-mentorperks.component';
import { CollegeyOpportunitiesComponent } from './collegey-opportunities/collegey-opportunities.component';
import { AddCollegeyopportunitiesComponent } from './add-collegeyopportunities/add-collegeyopportunities.component';
import { AddMentorfileComponent } from './add-mentorfile/add-mentorfile.component';
import { ListMentorfileComponent } from './list-mentorfile/list-mentorfile.component';
import { AddCuratedresourceComponent } from './add-curatedresource/add-curatedresource.component';
import { ViewCuratedresourceComponent } from './view-curatedresource/view-curatedresource.component';
import { ListMentortestimonialComponent } from './list-mentortestimonial/list-mentortestimonial.component';
import { AgreementTermsConditionComponent } from './agreement-terms-condition/agreement-terms-condition.component';
import { ListAgreementTermsComponent } from './list-agreement-terms/list-agreement-terms.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AddPrivacyPolicyComponent } from './add-privacy-policy/add-privacy-policy.component';
import { AddMentorResourceTitleComponent } from './add-mentor-resource-title/add-mentor-resource-title.component';
import { ViewMentorResourceTitleComponent } from './view-mentor-resource-title/view-mentor-resource-title.component';

@NgModule({
  declarations: [
    MentorsRoutingModule.components,
    MentorResourcesComponent,
    ViewmentorResourcesComponent,
    ViewMentorarticleComponent,
    AddMentorarticleComponent,
    AddMentorperksComponent,
    CollegeyOpportunitiesComponent,
    AddCollegeyopportunitiesComponent,
    AddMentorfileComponent,
    ListMentorfileComponent,
    AddCuratedresourceComponent,
    ViewCuratedresourceComponent,
    ListMentortestimonialComponent,
    AgreementTermsConditionComponent,
    ListAgreementTermsComponent,
    PrivacyPolicyComponent,
    AddPrivacyPolicyComponent,
    AddMentorResourceTitleComponent,
    ViewMentorResourceTitleComponent,
  ],
  imports: [
    CommonModule,
    MentorsRoutingModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    PipeModule,
    ThemeModule,
  ],
})
export class MentorModule {}
