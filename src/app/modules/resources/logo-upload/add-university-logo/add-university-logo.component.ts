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
import { Uploaduniversitylogo } from 'src/app/core/models/uploadlogo.model';
import { NzModalRef } from 'ng-zorro-antd';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}


@Component({
  selector: 'app-add-university-logo',
  templateUrl: './add-university-logo.component.html',
  styleUrls: ['./add-university-logo.component.css']
})
export class AddUniversityLogoComponent implements OnInit {
  isLoading = false;
  uploaduniversitylogoForm: FormGroup;
  uploaduniversitylogo: Uploaduniversitylogo;
  documentList = [];
  imageSource = ImageSource;
  mode: String;
  id: any;

  constructor(
    private fb: FormBuilder,
    private uploadlogoService: UploadlogoService,
    private utilService: UtilsService,
    public dialogRef: MatDialogRef<AddUniversityLogoComponent>,
    private modal: NzModalRef,
  ) {
  }

  initUploadUniversityLogoForm() {
    this.uploaduniversitylogoForm = this.fb.group({
      title: [this.uploaduniversitylogo ? this.uploaduniversitylogo.title : null, Validators.required],
      imageName: [this.uploaduniversitylogo ? this.uploaduniversitylogo.imageName : null],
    });

    if(this.uploaduniversitylogo?.imageName) {
      this.documentList.push(this.uploaduniversitylogo.imageName);
    }

  }

  onFileUpload(list) {
    this.uploaduniversitylogoForm.patchValue({
      imageName: list[0],
    });
  }

  onSubmitForm() {
    return new Promise<void>((resolve, reject) => {
      if (this.uploaduniversitylogoForm.invalid) {
        return;
      }
      let formData = this.uploaduniversitylogoForm.getRawValue();
      formData = this.utilService.removeNullFields(formData);
      this.isLoading = true;
      if (!this.uploaduniversitylogo) {
        this.saveUploadUniversityLogo(formData).then((response)=>{
          resolve()
        }).catch((e)=>{
          reject();
        });
      } else {
        this.updateUploadUniversityLogo(formData).then((response)=>{
          resolve()
        }).catch((e)=>{
          reject();
        });
      }
    })
    
  }

  updateUploadUniversityLogo(formData) {
    return new Promise((resolve, reject) => {
      this.uploadlogoService.updateUploadUniversityLogo(formData, this.uploaduniversitylogo._id).subscribe(
        (uploaduniversitylogo) => {
          Swal.fire('Successful', 'Logo updated successfully', 'success');
          this.isLoading = false;
          resolve(uploaduniversitylogo)
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

  saveUploadUniversityLogo(formData) {
    return new Promise((resolve, reject) => {
      this.uploadlogoService.saveUploadUniversityLogo(formData).subscribe(
        (uploaduniversitylogo) => {
          Swal.fire('Successful', 'Logo upload succesfully', 'success');
          this.isLoading = false;
          resolve(uploaduniversitylogo)
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
    this.initUploadUniversityLogoForm();
  }
  cancel() {
    this.modal.destroy();
  }

}
