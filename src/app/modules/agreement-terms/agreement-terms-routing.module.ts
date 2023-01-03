import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgreementTermsComponent } from './agreement-terms/agreement-terms.component';

const routes: Routes = [
  {
    path: 'agreement-condition',
    component: AgreementTermsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgreementTermsRoutingModule { }
