import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { StaticDataService } from 'src/app/core/services/staticData.service';
import Swal from 'sweetalert2';
import { ImageSource } from 'src/app/core/enums/image-upload-source.enum';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css'],
})
export class UploadDialogComponent implements OnInit {
  
  @Input() documentList = [];
  @Input() multipleSelection = null;
  @Input() imageSource;
  @Input() buttonText = 'Choose Document';
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onFileUploadSuccess = new EventEmitter();

  inValidFileSize = false;



  constructor(private commonService: CommonService) {}

  onSelectDocument(event) {
    const fileList = [];
    this.inValidFileSize = false;
    // called each time file input changes
    if (event.target.files && event.target.files.length > 0) {
      const input = event.target;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < input.files.length; i++) {
        const filesize = +((input.files[i].size / 1024) / 1024).toFixed(4);
        if(filesize > 5) {
          this.inValidFileSize = true;
          return;

        } else {
          if(this.multipleSelection) {
            fileList.push(input.files[i]); // in case of multiple selection
          } else {
            fileList.push(input.files[0]); // in case of single selection
            break;
          }
        }
      }
      const formData = new FormData();
      if (fileList.length > 0) {
        fileList.forEach((file) => {
          formData.append('files', file);
        });
      }
      if (fileList.length > 1) {
        formData.append('type', 'array');
      } else {
        formData.append('type', 'single');
      }

      this.uploadDocument(formData);
    }
  }


  uploadDocument(formData) {
    Swal.fire({
      title: 'Please wait...',
      text: 'Uploading Image',
      icon: 'info',
      onBeforeOpen: () => {
          Swal.showLoading();
      }
    });
    this.commonService.uploadImage(formData , this.imageSource).subscribe((file) => {
      Swal.close();
      if(file instanceof Array) {
        file.forEach(document => {
          this.documentList.push(document);
        });
      } else if(this.multipleSelection) {
        this.documentList.push(file);
      } else {
        this.documentList = [];
        this.documentList.push(file);
      }
      this.onFileUploadSuccess.emit(this.documentList);
    }, (error) => {
      // this.isLoading = false;
      Swal.fire(
        'Failed to upload image',
        error.message || error.error,
        'error'
      );
    });
  }

  // ngOnChanges() {
  //   this.completeNameDocumentList = this.documentList;
  //   this.documentList = [];
  //   if(this.completeNameDocumentList.length > 0) {
  //     this.completeNameDocumentList.forEach(file => {
  //       this.documentList.push(file);
  //     });
  //   }
  // }

  onRemoveDocument(index) {
    this.documentList.splice(index,1);
    this.onFileUploadSuccess.emit(this.documentList);
  }
  ngOnInit(): void {
  }
}
