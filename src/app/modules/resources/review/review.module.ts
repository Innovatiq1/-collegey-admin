import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserReviewComponent } from './user-review/user-review.component';
import { CollegeReviewComponent } from './college-review/college-review.component';
import { AddCollegeReviewComponent } from './college-review/add-college-review/add-college-review.component';
import { AddUserReviewComponent } from './user-review/add-user-review/add-user-review.component';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { MaterialModule } from 'src/app/material/material.module';
import { PipeModule } from 'src/app/shared/pipe.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [AddUserReviewComponent,AddCollegeReviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    PipeModule,
    ThemeModule
  ]
})
export class ReviewModule { }
