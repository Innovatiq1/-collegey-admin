import { Component, OnInit, Inject } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { CoursesService } from 'src/app/core/services/courses.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/core/models/courses.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageSource } from 'src/app/core/enums/image-upload-source.enum';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import Swal from 'sweetalert2';
import { NzModalRef } from 'ng-zorro-antd';


@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {
  submitted:boolean=false;
  course: Course;
  courseForm: FormGroup;
  isLoading = false;
  documentList = [];
  imageSource = ImageSource.COURSE;
  mode: String;
  id: any;

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private utilService: UtilsService,
    public dialogRef: MatDialogRef<AddCoursesComponent>,
    private modal: NzModalRef,
  ) { }

  initCourseForm() {
    this.courseForm  = this.fb.group({
      title: [this.course ? this.course.title : null , Validators.required],
      short_description: [
        this.course ? this.course.short_description : null,
        Validators.required,
      ],
      // redirect_link: [this.course ? this.course.redirect_link : null, CustomValidators.urlValidator],
      tags: [this.course ? this.course.tags : null, Validators.required],
      externalLink: [this.course ? this.course.externalLink : null, Validators.required],
      is_paid: [this.course ? this.course.is_paid : null, Validators.required],
      cost: [this.course ? this.course.cost : null],
      status: [this.course ? (this.course.status === 1 ? true : false) : null],
      image: [this.course ? this.course.image : null],
      description: [
        this.course ? this.course.description : null,
        Validators.required,
      ],
    });

    if(this.course?.image) {
      this.documentList.push(this.course.image);
    }
  }

  addTagFn(name) {
    return { name };
  }

  onFileUpload(list) {
    this.courseForm.patchValue({
      image: list[0],
    });
  }


  onSubmitForm() {
    this.submitted=true
    return new Promise<void>((resolve, reject) => {
      this.courseForm.markAllAsTouched();
      if(this.courseForm.invalid) {
        return;
      }
      let formData = this.courseForm.getRawValue();
      const tags = [];
      formData.tags.forEach((tag) => {
        if(tag.label) {
          tags.push(tag.label);
        } else {
          tags.push(tag);
        }
      });
      formData.tags = tags;
      if (formData.status) {
        formData.status = 1;
      } else {
        formData.status = 2;
      }
      formData = this.utilService.removeNullFields(formData);
      this.isLoading = true;
      if (!this.course) {
        console.log("formData",formData);
        
        this.saveCourses(formData).then((response)=>{
          resolve()
        }).catch((e)=>{
          reject();
        });
      } else {
        this.updateCourses(formData).then((response)=>{
          resolve()
        }).catch((e)=>{
          reject();
        });
      }
    })
    
  }

  updateCourses(formData) {
    return new Promise((resolve, reject) => {
      this.coursesService.updateCourses(formData, this.course.id).subscribe(course => {
        Swal.fire('Successful', 'Course updated successfully', 'success');
        this.isLoading = false;
        // this.dialogRef.close(course);
        resolve(course)
      },
      (err) => {
        this.isLoading = false;
        Swal.fire(
          'Failed to update course',
          err.message || err.error,
          'error'
        );
        reject(err)
      });
    })
    
  }

  saveCourses(formData) {
    return new Promise((resolve, reject) => {
      this.coursesService.saveCourses(formData).subscribe(course => {
        Swal.fire('Successful', 'Course added succesfully', 'success');
        this.isLoading = false;
        resolve(course)
        // this.dialogRef.close(course);
      }, (err) => {
        this.isLoading = false;
        Swal.fire('Failed to add course', err.message || err.error, 'error');
        reject(err)
      });
    })
    

  }

  ngOnInit(): void {
    this.initCourseForm();
    if (!this.course) {
      this.courseForm.patchValue({
        externalLink: 'https://www.',
      });
    }
  }

  cancel() {
    this.modal.destroy();
  }

}
