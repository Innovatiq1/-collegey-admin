import { Component, OnInit, NgModule, Inject } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/shared/components/email-state-matcher';
import { STUDENT_QUALIFICATION } from 'src/app/shared/constants/data/common.data';
import { StudentService } from 'src/app/core/services/student.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentDetail } from 'src/app/core/models/user.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/shared/constants/app.constants';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  studentFormGroup: FormGroup;
  studentQualification = STUDENT_QUALIFICATION;
  student: StudentDetail;
  matcher = new MyErrorStateMatcher();
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private dialogRef: MatDialogRef<AddStudentComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.student = this.data ? this.data.updatedStudentInfo : null;
  }

  initializeStudentForm(): void {
    this.studentFormGroup = this.fb.group({
      name: [this.student ? this.student.name : null, Validators.required],
      email: [
        this.student ? this.student.email : null,
        [Validators.required,Validators.pattern(AppConstants.EMAIL_PATTERN)],
      ],
      password: [null, Validators.required],
      qualification: [
        this.student ? this.student.qualification : null,
        Validators.required,
      ],
      otherQualification: [''],
    });

    if (this.student && !this.checkOtherQualification()) {
      this.studentFormGroup.patchValue({
        qualification: 'Other',
        otherQualification: this.student.qualification,
      });
    }
  }

  checkOtherQualification(): boolean {
    let isFound = false;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.studentQualification.length; i++) {
      if (this.studentQualification[i].includes(this.student.qualification)) {
        return true;
      } else {
        isFound = false;
      }
    }
    return isFound;
  }

  ngOnInit(): void {
    this.initializeStudentForm();
    this.studentFormGroup
      .get('qualification')
      .valueChanges.subscribe((selectedValue) => {
        if (selectedValue === 'Other') {
          this.studentFormGroup
            .get('otherQualification')
            .setValidators(Validators.required);
          this.studentFormGroup.updateValueAndValidity();
        }
      });
  }

  onSubmitForm(): void {
    if (this.studentFormGroup.invalid) {
      return;
    }

    if (this.studentFormGroup.get('qualification').value === 'Other') {
      this.studentFormGroup.patchValue({
        qualification: this.studentFormGroup.get('otherQualification').value,
      });
    }

    const formObj = this.studentFormGroup.getRawValue();
    delete formObj.otherQualification;
    this.isLoading = true;
    !this.student ? this.addNewStudent(formObj) : this.updateStudent(formObj);
  }

  addNewStudent(obj) {
    this.studentService.saveStudent(obj).subscribe(
      (response) => {
        this.isLoading = false;
        Swal.fire({
          title: 'Successful',
          text: 'student created succesfully',
          icon: 'success',
        });
        this.dialogRef.close(response);
      },
      (error) => {
        this.isLoading = false;
        Swal.fire(
          'Failed to create student',
          error.message || error.error,
          'error'
        );
      }
    );
  }
  updateStudent(obj) {
    this.studentService.updateStudent(obj, this.student._id).subscribe(
      (response) => {
        console.log(response,"Update");
        this.isLoading = false;
        Swal.fire({
          title: 'Successful',
          text: 'student updated succesfully',
          icon: 'success',
        }).then(() => {
          this.dialogRef.close(true);
        });
      },
      (error) => {
        this.isLoading = false;
        Swal.fire(
          'Failed to update student',
          error.message || error.error,
          'error'
        );
      }
    );
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
@NgModule({
  declarations: [AddStudentComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
class AddStudentModule {}
