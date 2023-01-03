import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { PipeModule } from 'src/app/shared/pipe.module';
import { FormsModule } from '@angular/forms'; 
import { ThemeModule } from 'src/app/@theme/theme.module'; 

import { PageContentRoutingModule } from './page-content-routing.module';

import { AddIntroFirstSecComponent } from './add-intro-first-sec/add-intro-first-sec.component';
import { ViewIntroFirstSecComponent } from './view-intro-first-sec/view-intro-first-sec.component';
import { AddCollegyPartnerSecComponent } from './add-collegy-partner-sec/add-collegy-partner-sec.component';
import { ViewCollegyPartnerSecComponent } from './view-collegy-partner-sec/view-collegy-partner-sec.component';
import { AddHomeFourthSecComponent } from './add-home-fourth-sec/add-home-fourth-sec.component';
import { ViewHomeFourthSecComponent } from './view-home-fourth-sec/view-home-fourth-sec.component';
import { AddHomeSecondSecComponent } from './add-home-second-sec/add-home-second-sec.component';
import { ViewHomeSecondSecComponent } from './view-home-second-sec/view-home-second-sec.component';
import { AddHomeBottomFirstSlideComponent } from './add-home-bottom-first-slide/add-home-bottom-first-slide.component';
import { ViewHomeBottomFirstSlideComponent } from './view-home-bottom-first-slide/view-home-bottom-first-slide.component';
import { ViewHomeBottomSecondSlideComponent } from './view-home-bottom-second-slide/view-home-bottom-second-slide.component';
import { AddHomeBottomSecondSlideComponent } from './add-home-bottom-second-slide/add-home-bottom-second-slide.component';
import { AddHomeFirstSectionComponent } from './add-home-first-section/add-home-first-section.component';
import { ViewHomeFirstSectionComponent } from './view-home-first-section/view-home-first-section.component';
import { ViewHomeFourthSectionComponent } from './view-home-fourth-section/view-home-fourth-section.component';
import { AddHomeFourthSectionComponent } from './add-home-fourth-section/add-home-fourth-section.component';
import { AddHomeThirdSectionComponent } from './add-home-third-section/add-home-third-section.component';
import { ViewHomeThirdSectionComponent } from './view-home-third-section/view-home-third-section.component';
import { ViewHomeFifthSectionComponent } from './view-home-fifth-section/view-home-fifth-section.component';
import { AddHomeFifthSectionComponent } from './add-home-fifth-section/add-home-fifth-section.component';

import { AddHomeSixthSecComponent } from './add-home-sixth-sec/add-home-sixth-sec.component';
import { ViewHomeSixthSecComponent } from './view-home-sixth-sec/view-home-sixth-sec.component';
import { AddHomeFooterDataComponent } from './add-home-footer-data/add-home-footer-data.component';
import { ViewHomeFooterDataComponent } from './view-home-footer-data/view-home-footer-data.component';
import { ViewCollegyProgramTextComponent } from './view-collegy-program-text/view-collegy-program-text.component';
import { AddCollegyProgramTextComponent } from './add-collegy-program-text/add-collegy-program-text.component';


@NgModule({
  declarations: [AddIntroFirstSecComponent, ViewIntroFirstSecComponent, AddCollegyPartnerSecComponent, ViewCollegyPartnerSecComponent, AddHomeFourthSecComponent, ViewHomeFourthSecComponent, AddHomeSecondSecComponent, ViewHomeSecondSecComponent, AddHomeBottomFirstSlideComponent, ViewHomeBottomFirstSlideComponent, ViewHomeBottomSecondSlideComponent, AddHomeBottomSecondSlideComponent, AddHomeSixthSecComponent, ViewHomeSixthSecComponent, AddHomeFirstSectionComponent, ViewHomeFirstSectionComponent, ViewHomeFourthSectionComponent, AddHomeFourthSectionComponent, AddHomeThirdSectionComponent, ViewHomeThirdSectionComponent, ViewHomeFifthSectionComponent, AddHomeFifthSectionComponent, AddHomeFooterDataComponent, ViewHomeFooterDataComponent, ViewCollegyProgramTextComponent, AddCollegyProgramTextComponent],
  imports: [
    CommonModule,
    PageContentRoutingModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    PipeModule,
    ThemeModule
  ]
})
export class PageContentModule { }
