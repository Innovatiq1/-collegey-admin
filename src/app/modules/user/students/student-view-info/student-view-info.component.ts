import { Component, OnInit, NgModule, Inject, Optional } from '@angular/core';
import { StudentService } from 'src/app/core/services/student.service';
import { MaterialModule } from 'src/app/material/material.module';
import { StudentDetail } from 'src/app/core/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DialogService } from 'src/app/core/services/dialog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-view-info',
  templateUrl: './student-view-info.component.html',
  styleUrls: ['./student-view-info.component.css'],
})
export class StudentViewInfoComponent implements OnInit {
  isLoading = false;
  studentInfo: StudentDetail;
  id:string;
  constructor(
    private studentService: StudentService,
    private dialogRef: MatDialogRef<StudentViewInfoComponent>,
    private dialog: MatDialog,
    private dialogService: DialogService,  private route: ActivatedRoute,

  ) {}

  closeModal() {
    this.dialogRef.close();
  }

  async openUpdateModal() {
    const { AddStudentComponent } = await import(
      '../add-student/add-student.component'
    );
    const dialogConfig = this.dialogService.configureDialog({
      updatedStudentInfo: this.studentInfo,
    });
    this.dialog
      .open(AddStudentComponent, dialogConfig).afterClosed().subscribe(data=> {
        if(data) {
          window.location.reload();
        }
      });
  }

  ngOnInit(): void {
    console.log(this.route,"ROUTE");
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.studentService.getStudentInfo(this.id).subscribe(info => {
      this.studentInfo = info;
      console.log(info,"VIEWWWWWWWWWWWWWWW");
    });
  }
}

@NgModule({
  declarations: [StudentViewInfoComponent],
  imports: [MaterialModule, CommonModule],
})
class StudentViewInfoModule {}
