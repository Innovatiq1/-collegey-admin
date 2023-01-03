import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageSource } from 'src/app/core/enums/image-upload-source.enum';
import { CommonService } from 'src/app/core/services/common.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { error } from 'protractor';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { UploadlogoService } from 'src/app/core/services/uploadlogo.service';
import { Uploadlogo } from 'src/app/core/models/uploadlogo.model';
import { NzModalRef } from 'ng-zorro-antd';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}


@Component({
  selector: 'app-add-logo-upload',
  templateUrl: './add-logo-upload.component.html',
  styleUrls: ['./add-logo-upload.component.css']
})
export class AddLogoUploadComponent implements OnInit {
  isLoading = false;
  uploadLogoForm: FormGroup;
  uploadlogo: Uploadlogo;
  documentList = [];
  imageSource = ImageSource;
  mode: String;
  id: any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddLogoUploadComponent>,
    private uploadlogoService: UploadlogoService,
    private commonService: CommonService,
    private utilService: UtilsService,
    private modal: NzModalRef,
  ) {
  }

  initUploadLogoForm() {
    this.uploadLogoForm = this.fb.group({
      title: [this.uploadlogo ? this.uploadlogo.title : null, Validators.required],
      imageName: [this.uploadlogo ? this.uploadlogo.imageName : null],
    });

    if(this.uploadlogo?.imageName) {
      this.documentList.push(this.uploadlogo.imageName);
    }

  }

  onFileUpload(list) {
    this.uploadLogoForm.patchValue({
      imageName: list[0],
    });
  }

  onSubmitForm() {
    return new Promise<void>((resolve, reject) => {
      if (this.uploadLogoForm.invalid) {
        return;
      }
      let formData = this.uploadLogoForm.getRawValue();
      formData = this.utilService.removeNullFields(formData);
      formData['location'] = "https://s3.ap-southeast-1.amazonaws.com/storage.collegey/"+formData.imageName;
      this.isLoading = true;
      if (!this.uploadlogo) {
        this.saveUploadlogo(formData).then((response)=>{
          resolve()
        }).catch((e)=>{
          reject();
        });
      } else {
        this.updateUploadlogo(formData).then((response)=>{
          resolve()
        }).catch((e)=>{
          reject();
        });
      }
    })
    
  }

  updateUploadlogo(formData) {
    return new Promise((resolve, reject) => {
      this.uploadlogoService.updateUploadlogo(formData, this.uploadlogo._id).subscribe(
        (uploadlogo) => {
          Swal.fire('Successful', 'Logo updated successfully', 'success');
          this.isLoading = false;
          resolve(uploadlogo)
        },
        (err) => {
          this.isLoading = false;
          Swal.fire(
            'Failed to update logo',
            err.message || err.error,
            'error'
          );
          reject(err)
        }
      );
    })
    
  }

  saveUploadlogo(formData) {
    return new Promise((resolve, reject) => {
      this.uploadlogoService.saveUploadlogo(formData).subscribe(
        (uploadlogo) => {
          Swal.fire('Successful', 'Logo upload succesfully', 'success');
          this.isLoading = false;
          resolve(uploadlogo)
        },
        (err) => {
          this.isLoading = false;
          Swal.fire('Failed to upload logo', err.message || err.error, 'error');
          reject(err)
        }
      );
    })
  }

  ngOnInit(): void {
    this.initUploadLogoForm();
  }
  cancel() {
    this.modal.destroy();
  }

}
