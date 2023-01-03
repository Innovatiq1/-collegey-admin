import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentProfileComponent } from './student-details/student-profile/student-profile.component';
import { StudentViewInfoComponent } from './student-view-info/student-view-info.component';
import { StudentPortfolioInfoComponent } from './student-details/student-profile/student-portfolio-info/student-portfolio-info.component';
import { StudentHistoryComponent } from './student-details/student-profile/student-history/student-history.component';
import { StudentGetInTouchComponent } from './student-details/student-profile/student-get-in-touch/student-get-in-touch.component';
import { StudentGeographyComponent } from './student-details/student-profile/student-geography/student-geography.component';
import { StudentHeadedComponent } from './student-details/student-profile/student-headed/student-headed.component';
import { StudentKnowYouBetterComponent } from './student-details/student-profile/student-know-you-better/student-know-you-better.component';
import { StudentInterestsAreasComponent} from './student-details/student-profile/student-interests-areas/student-interests-areas.component';
import { StudentStudiedComponent } from './student-details/student-profile/student-studied/student-studied.component';
import { StudentPreferencesComponent } from './student-details/student-profile/student-preferences/student-preferences.component';

const routes: Routes = [
  {
    path: '',
    component: StudentViewInfoComponent,
  },
  {
    path: 'basic-info',
    component: StudentViewInfoComponent,
  },
  {
    path: 'profile',
    component: StudentProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {
  static components = [
    StudentProfileComponent,
    StudentPortfolioInfoComponent,
    StudentHistoryComponent,
    StudentGetInTouchComponent,
    StudentGeographyComponent,
    StudentHeadedComponent,
    StudentKnowYouBetterComponent,
    StudentInterestsAreasComponent,
    StudentStudiedComponent,
    StudentPreferencesComponent
  ];
}
