import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageSource } from 'src/app/core/enums/image-upload-source.enum';
import { CommonService } from 'src/app/core/services/common.service';
import { WebinarService } from 'src/app/core/services/webinar.service';
import { DatePipe } from '@angular/common';
import { UtilsService } from 'src/app/core/services/utils.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { Webinar } from 'src/app/core/models/webinar.model';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-add-webinar',
  templateUrl: './add-webinar.component.html',
  styleUrls: ['./add-webinar.component.css'],
})
export class AddWebinarComponent implements OnInit {
  submitted:boolean=false
  isLoading = false;
  webinarForm: FormGroup;
  webinar: Webinar;
  documentList = [];
  imageSource = ImageSource.WEBINARS;
  mode: String;
  id: any;
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private webinarService: WebinarService,
    private datePipe: DatePipe,
    private utilService: UtilsService,
    public dialogRef: MatDialogRef<AddWebinarComponent>,
    private modal: NzModalRef,
  ) {
  }

  initWebinarForm() {
    this.webinarForm = this.fb.group({
      title: [this.webinar ? this.webinar.title : null, Validators.required],
      description: [
        this.webinar ? this.webinar.description : null,
        Validators.required,
      ],
      video_url: [
        this.webinar ? this.webinar.video_url : null,
        CustomValidators.urlValidator,
      ],
      tags: [this.webinar ? this.webinar.tags : null, Validators.required],
      date: [this.webinar ? this.webinar.date : null, Validators.required],
      is_paid: [
        this.webinar ? this.webinar.is_paid : null,
        Validators.required,
      ],
      cost: [this.webinar ? this.webinar.cost : null],
      status: [this.webinar ? (this.webinar.status = this.webinar.status === 1 ? true : false ) : null],
      image: [this.webinar ? this.webinar.image : null],
    });
    if(this.webinar?.image) {
      this.documentList.push(this.webinar.image);
    }
  }

  addTagFn(name) {
    return { name };
  }

  onFileUpload(list) {
    this.webinarForm.patchValue({
      image: list[0],
    });
  }

  onSubmitForm() {
    this.submitted=true
    return new Promise<void>((resolve, reject) => {
      this.webinarForm.markAllAsTouched();
      if (this.webinarForm.invalid) {
        return;
      }
      let formData = this.webinarForm.getRawValue();
      formData.date = this.datePipe.transform(formData.date, 'yyyy-MM-dd');
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
      if (!this.webinar) {
        this.saveWebinar(formData).then((response)=>{
          resolve()
        }).catch((e)=>{
          reject();
        });
      } else {
        this.updateWebinar(formData).then((response)=>{
          resolve()
        }).catch((e)=>{
          reject();
        });
      }
    })
    
  }

  updateWebinar(formData) {
    return new Promise((resolve, reject) => {
      this.webinarService.updateWebinar(formData, this.webinar.id).subscribe(
        (webinar) => {
          Swal.fire('Successful', 'Webinar updated successfully', 'success');
          this.isLoading = false;
          // this.dialogRef.close(webinar);
          resolve(webinar)
        },
        (err) => {
          this.isLoading = false;
          Swal.fire(
            'Failed to update webinar',
            err.message || err.error,
            'error'
          );
          reject(err)
        }
      );
    })
    
  }
  saveWebinar(formData) {
    return new Promise((resolve, reject) => {
      this.webinarService.saveWebinar(formData).subscribe(
        (webinar) => {
          Swal.fire('Successful', 'Webinar added succesfully', 'success');
          this.isLoading = false;
          // this.dialogRef.close(webinar);
          resolve(webinar)
        },
        (err) => {
          this.isLoading = false;
          Swal.fire('Failed to add webinar', err.message || err.error, 'error');
          reject(err)
        }
      );
    })
    
  }

  ngOnInit(): void {
    this.initWebinarForm();
    if (!this.webinar) {
      this.webinarForm.patchValue({
        video_url : 'https://www.youtube.com/embed/',
      });
    }
  }
  cancel() {
    this.modal.destroy();
  }
}
