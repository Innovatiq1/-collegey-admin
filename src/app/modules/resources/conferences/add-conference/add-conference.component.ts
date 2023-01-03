import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageSource } from 'src/app/core/enums/image-upload-source.enum';
import { CommonService } from 'src/app/core/services/common.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { error } from 'protractor';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { Conference } from 'src/app/core/models/conference.model';
import { ConferenceService } from 'src/app/core/services/conference.service';
import { NzModalRef } from 'ng-zorro-antd';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-add-conference',
  templateUrl: './add-conference.component.html',
  styleUrls: ['./add-conference.component.css']
})

export class AddConferenceComponent implements OnInit {
  submitted:boolean = false;
  isLoading = false;
  conferenceForm: FormGroup;
  conference: Conference;
  documentList = [];
  imageSource = ImageSource.CONFERENCES;
  mode: String;
  id: any;

  constructor(
    private fb: FormBuilder,
    private conferenceService: ConferenceService,
    private utilService: UtilsService,
    public dialogRef: MatDialogRef<AddConferenceComponent>,
    private modal: NzModalRef,
  ) {
  }

  initConferenceForm() {
    this.conferenceForm = this.fb.group({
      title: [this.conference ? this.conference.title : null, Validators.required],
      short_description: [
        this.conference ? this.conference.short_description : null,
        Validators.required,
      ],
      description: [
        this.conference ? this.conference.description : null,
        Validators.required,
      ],
      redirect_link: [this.conference ? this.conference.redirect_link : null,
        CustomValidators.urlValidator],
      tags: [this.conference ? this.conference.tags : null, Validators.required],
      is_paid: [
        this.conference ? this.conference.is_paid : null,
        Validators.required,
      ],
      cost: [this.conference ? this.conference.cost : null],
      status: [this.conference ? (this.conference.status = this.conference.status === 1 ? true : false ) : null],
      image: [this.conference ? this.conference.image : null],
    });

    if(this.conference?.image) {
      this.documentList.push(this.conference.image);
    }

  }

  addTagFn(name) {
    return { name };
  }

  onFileUpload(list) {
    this.conferenceForm.patchValue({
      image: list[0],
    });
  }

  onSubmitForm() {
    this.submitted=true;
    return new Promise<void>((resolve, reject) => {
      this.conferenceForm.markAllAsTouched();
      if (this.conferenceForm.invalid) {
        return;
      }
      let formData = this.conferenceForm.getRawValue();
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
      if (!this.conference) {
        this.saveConference(formData).then((response)=>{
          resolve()
        }).catch((e)=>{
          reject();
        });
      } else {
        this.updateConference(formData).then((response)=>{
          resolve()
        }).catch((e)=>{
          reject();
        });
      }
    })
    
  }

  updateConference(formData) {
    return new Promise((resolve, reject) => {
      this.conferenceService.updateConference(formData, this.conference._id).subscribe(
        (conference) => {
          Swal.fire('Successful', 'Conference updated successfully', 'success');
          this.isLoading = false;
          // this.dialogRef.close(conference);
          resolve(conference)
        },
        (err) => {
          this.isLoading = false;
          Swal.fire(
            'Failed to update conference',
            err.message || err.error,
            'error'
          );
          reject(err)
        }
      );
    })
    
  }
  saveConference(formData) {
    return new Promise((resolve, reject) => {
      this.conferenceService.saveConference(formData).subscribe(
        (conference) => {
          Swal.fire('Successful', 'Conference added succesfully', 'success');
          this.isLoading = false;
          // this.dialogRef.close(conference);
          resolve(conference)
        },
        (err) => {
          this.isLoading = false;
          Swal.fire('Failed to add conference', err.message || err.error, 'error');
          reject(err)
        }
      );
    })
  }

  ngOnInit(): void {
    this.initConferenceForm();
    if (!this.conference) {
      this.conferenceForm.patchValue({
        redirect_link:'https://www.',
      });
    }
  }
  cancel() {
    this.modal.destroy();
  }
}
