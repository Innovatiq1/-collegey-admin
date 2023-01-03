import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from 'src/app/core/services/student.service';
import { Users } from 'src/app/core/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  templateUrl: './student-listing.component.html',
  styleUrls: ['./student-listing.component.css'],
})
export class StudentListingComponent implements OnInit {
  studentList: any;
  isLoading = false;

  constructor(
    private studentService: StudentService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef
  ) {}

  getStudentList(filters) {
    this.isLoading = true;
    this.studentService.getStudentsList({
      limit: (filters && filters.limit) ? filters.limit : AppConstants.DEFAULT_QUERY_LIMIT,
      ...filters
    }).subscribe(
      (students) => {
        console.log(students,"STUDENTS DATAT");
        this.isLoading = false;
        this.studentList = students;
        this.ref.detectChanges();
        if(students.totalDocs - (+filters.limit) < -11) {
          this._showSnackbar("No more data found")
        }

      },
      (error) => {
        this.isLoading = false;
        this.snackbar.open(error.message, null, { duration: 3000 });
      }
    );
  }

  async openCreateStudentModal() {
    const { AddStudentComponent } = await import(
      '../add-student/add-student.component'
    );
    this.dialog
      .open(AddStudentComponent)
      .afterClosed()
      .subscribe((addStudent) => {
        if (addStudent && Object.keys(addStudent).length != 0) {
          this.studentList.push(addStudent);
        }
      });
  }


  // async  openCreateStudentModal() {
  //   const { AddStudentComponent } = await import(
  //     '../add-student/add-student.component'
  //   );
  //   const dialogRef = this.dialog.open(AddStudentComponent, {
  //     width: '250px',
  //   });

  //   dialogRef.afterClosed() .subscribe((addStudent) => {
  //     if (addStudent && Object.keys(addStudent).length != 0) {
  //       this.studentList.push(addStudent);
  //     }
  //   });
  // }


  _showSnackbar(message) {
    this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params,"PPPPPPPPPPPPPPPPPPPPPPPP");
      this.getStudentList(params);
    });

  }
}

@NgModule({
  declarations: [StudentListingComponent],
  imports: [CommonModule, MaterialModule, RouterModule, SharedModule],
})
class StudentListingModule {}
