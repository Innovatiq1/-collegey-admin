import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentNzComponent } from './student-nz.component';


const routes: Routes = [ {
  path: 'student',
  component: StudentNzComponent,
},];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentNzRoutingModule { }
