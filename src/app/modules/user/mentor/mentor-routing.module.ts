import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MentorComponent } from './mentor.component';


const routes: Routes = [
  {
    path: 'mentor',
    component: MentorComponent,
  },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorRoutingModule { }
