import { Component, OnInit, Input, ElementRef, ViewChild, ChangeDetectorRef} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { Course } from 'src/app/core/models/courses.model';
import { DialogService } from 'src/app/core/services/dialog.service';
import { CoursesService } from 'src/app/core/services/courses.service';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { AddCoursesComponent } from '../add-courses/add-courses.component';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}


@Component({
  selector: 'app-course-listing',
  templateUrl: './course-listing.component.html',
  styleUrls: ['./course-listing.component.css']
})
export class CourseListingComponent implements OnInit {

  isLoading = false;
  courses: Course[] = [];
  searchText: string = "";
  modal: NzModalRef;
  Mode = Mode;
  @ViewChild("searchBox") searchBox: ElementRef;
  @ViewChild("fileImportInput") fileImportInput: any;
  keyup$: Observable<any>;

  constructor(
    private coursesService: CoursesService,
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private modalService: NzModalService,
    private ref: ChangeDetectorRef
  ) { }

  addNewCourse() {
    const dialogConfig = this.dialogService.configureDialog(null);
    this.dialog.open(AddCoursesComponent, dialogConfig).afterClosed().subscribe(response => {
      if(response) {
        this.courses.push(response);
      }
    })
  }

  _getCourses(filter) {
    this.isLoading = true;
    this.coursesService.getCoursesList(filter).subscribe(course => {
      this.isLoading = false;
      this.courses  = course.docs;
      if (course?.totalDocs <= course?.limit || course?.totalDocs <= 0) {
        this._showSnackbar("No more data found")
        this.isLoading = true;
      }
      this.ref.detectChanges();
    }, (error) => {
      this.isLoading = false;
      this.snackBar.open(error.message || error.error, null);
    });

  }

  deleteCourse(id,course){
    if(confirm("Are you sure to delete this Course"))
    {
    this.coursesService.deleteCourse(id).subscribe(course =>{
      this.activatedRoute.queryParams.subscribe(params => {
        this._getCourses(params);
      });
    })
  }
  }

  _showSnackbar(message) {
    this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
  }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this._getCourses(params);
    });
  }

  openModal(mode: Mode, id = null, item = null) {
    console.log("Clicked")
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Create Course" : "Update Course",
      nzContent: AddCoursesComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.onSubmitForm().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this._getCourses(params);
            });
            });
          },
        },
        {
          label: "Cancel",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "default",
          onClick: (componentInstance) => {
            componentInstance!.cancel();
          },
        },
        {
          label: "close",
          show: item ? (item.isDeleted ? true : false) : false,
          type: "default",
          onClick: (componentInstance) => {
            componentInstance!.cancel();
          },
        },
      ],
      nzMaskClosable: false,
      nzWidth:900,
      nzComponentParams: {
        mode: mode,
        id: id,
        course:item
      },
    });
  }

}
