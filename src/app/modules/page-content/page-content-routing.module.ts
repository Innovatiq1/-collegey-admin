import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Load Component
import { ViewIntroFirstSecComponent } from './view-intro-first-sec/view-intro-first-sec.component';
import { ViewCollegyPartnerSecComponent } from './view-collegy-partner-sec/view-collegy-partner-sec.component';
import { ViewHomeFourthSecComponent } from './view-home-fourth-sec/view-home-fourth-sec.component';
import { ViewHomeSecondSecComponent } from './view-home-second-sec/view-home-second-sec.component';
import { ViewHomeBottomFirstSlideComponent } from './view-home-bottom-first-slide/view-home-bottom-first-slide.component';
import { ViewHomeBottomSecondSlideComponent } from './view-home-bottom-second-slide/view-home-bottom-second-slide.component';
import { ViewHomeFirstSectionComponent } from './view-home-first-section/view-home-first-section.component';
import { ViewHomeFourthSectionComponent } from './view-home-fourth-section/view-home-fourth-section.component';
import { ViewHomeThirdSectionComponent } from './view-home-third-section/view-home-third-section.component';
import { ViewHomeFifthSectionComponent } from './view-home-fifth-section/view-home-fifth-section.component';
import { ViewHomeSixthSecComponent } from './view-home-sixth-sec/view-home-sixth-sec.component';
import { ViewHomeFooterDataComponent } from './view-home-footer-data/view-home-footer-data.component';
import { ViewCollegyProgramTextComponent } from './view-collegy-program-text/view-collegy-program-text.component';

const routes: Routes = [
  {
    path: 'home-intro-sec-01',
    component: ViewIntroFirstSecComponent,
  },
  {
    path: 'home-first-section',
    component: ViewHomeFirstSectionComponent,
  },
  {
    path: 'home-third-section',
    component: ViewHomeThirdSectionComponent,
  },
  {
    path: 'home-fourth-section',
    component: ViewHomeFourthSectionComponent,
  },
  {
    path: 'home-fifth-section',
    component: ViewHomeFifthSectionComponent,
  },
  {
    path: 'home-sec-02',
    component: ViewHomeSecondSecComponent,
  },
  {
    path: 'home-sec-03',
    component: ViewCollegyPartnerSecComponent,
  },
  { 
    path: 'home-sec-04',
    component: ViewHomeFourthSecComponent,
  },
  { 
    path: 'home-sec-06',
    component: ViewHomeSixthSecComponent,
  },
  { 
    path: 'home-bottom-slide-01',
    component: ViewHomeBottomFirstSlideComponent,
  },
  { 
    path: 'home-bottom-slide-02',
    component: ViewHomeBottomSecondSlideComponent,
  },
  { 
    path: 'home-footer-content',
    component: ViewHomeFooterDataComponent,
  },
  { 
    path: 'collegy-program-content',
    component: ViewCollegyProgramTextComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageContentRoutingModule { }
