import { Component, OnInit, NgModule, Inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipeModule } from 'src/app/shared/pipe.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/core/services/common.service';
import { NzModalRef } from 'ng-zorro-antd';
import { Mentor } from 'src/app/core/models/mentor';
import { StudentService } from 'src/app/core/services/student.service';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-show-student-information',
  templateUrl: './show-student-information.component.html',
  styleUrls: ['./show-student-information.component.css']
})
export class ShowStudentInformationComponent implements OnInit {

  mentor: Mentor;
  ProfileData: any;
  constructor(
    private dialogRef: MatDialogRef<ShowStudentInformationComponent>,
    private studentService: StudentService,
    public commonService: CommonService,
    private modal: NzModalRef,
  ) { }

  ngOnInit(): void {
    this.getCurrentUserData();
  } 

  getCurrentUserData()
    {
      const obj = {
        userid: this.mentor?._id,
      };
      this.studentService.getCurrentUserDataFetch(obj).subscribe(
        (response) => { 
          this.ProfileData = response?.data;
          console.log("this.ProfileData",this.ProfileData);
        }, 
        (err) => {
          
        },
      );   
    }

  closeModal() {
    this.dialogRef.close();
  }

  sliceImageName(file) {
    return file.slice(27);
  }
  
  cancel() {
    this.modal.destroy();
  }

}

@NgModule({
  declarations: [ShowStudentInformationComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    PipeModule,
  ],
})
class AddParentsModule {}
