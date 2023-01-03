import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from 'src/app/core/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Course } from 'src/app/core/models/courses.model';
import { AddCoursesComponent } from './add-courses/add-courses.component';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/shared/constants/app.constants';


@Component({
  selector: 'app-active-courses',
  templateUrl: './active-courses.component.html',
  styleUrls: ['./active-courses.component.css']
})
export class ActiveCoursesComponent implements OnInit {
    isLoading = false;
  courseList: Course[] = [];

  constructor(
    private coursesService: CoursesService,
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
  ) { }

  addNewcourse() {
    const dialogConfig = this.dialogService.configureDialog(null);
    this.dialog.open(AddCoursesComponent, dialogConfig).afterClosed().subscribe(response => {
      if(response) {
        this.courseList.push(response);
      }
    })
  }

  _getcourses(filter) {
    this.isLoading = true;
    this.coursesService.getCoursesList(filter).subscribe(course => {
      this.isLoading = false;
      this.courseList  = course.docs;
      console.log(this.courseList);
      if(course.totalDocs - (+filter.limit) < -11) {
        this._showSnackbar("No more data found")
      }
    }, (error) => {
      this.isLoading = false;
      this.snackBar.open(error.message || error.error, null);
    });

  }

  _showSnackbar(message) {
    this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this._getcourses(params);
    });
  }

}
