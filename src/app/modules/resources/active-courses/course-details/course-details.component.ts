import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/core/services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/core/services/dialog.service';
import { Course } from 'src/app/core/models/courses.model';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { AddCoursesComponent } from '../add-courses/add-courses.component';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  isLoading = false;
  courseDetails: Course;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private coursesService: CoursesService,
    private matSnackBar: MatSnackBar,
    private dialogService: DialogService,
    public commonService: CommonService
  ) { }

  _getCourseDetail(id) {
    this.isLoading = true;
    this.coursesService.getCourseDetails(id).subscribe(detail => {
      this.courseDetails = detail;
      this.isLoading = false;
    },(error) => {
      this.isLoading = false;
      this.matSnackBar.open(error.error || error.message, null, {
          duration: AppConstants.TOAST_DISPLAY_TIME
      });
  });
  }

  editCourse(){
    const dialogConfig = this.dialogService.configureDialog({
      course: this.courseDetails
  });
    this.dialog.open(AddCoursesComponent, dialogConfig).afterClosed().subscribe(courseDetails => {
      if (courseDetails) {
          this.courseDetails = courseDetails;
      }
  });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(urlParam => {
      this. _getCourseDetail(urlParam.get('id'));
  });
  }

}
