import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { FeedService } from 'src/app/core/services/feed.service';
import { InvestInService } from 'src/app/core/services/invest-in.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FundInService } from 'src/app/core/services/fund-in.service';
import { PartnerWithService } from 'src/app/core/services/partner-with.service';
import { CareerAtService } from 'src/app/core/services/career-at.service';
enum Mode {
  Create = 'Create',
  Edit = 'Edit',
}

@Component({
  selector: 'app-career-at',
  templateUrl: './career-at.component.html',
  styleUrls: ['./career-at.component.css']
})
export class CareerAtComponent implements OnInit {
  mode: String;
  id: any;
  itemData: any;
  pageContent: any;
  fundInForm: FormGroup;

  selectFile: any;

 
  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private http: HttpClient,
    private careerService:CareerAtService,
  ) {}

  ngOnInit(): void {
    this.initialize();
  }
  
  initialize() {
    this.createForm();
    if (this.mode === Mode.Edit) {
      this.fetchUpdated();
    } else {
    }
  }

  createForm() {
    this.fundInForm = this.fb.group({
      mainTitle: [null, Validators.required],
      title: [null, [Validators.required]],
      subTitle: [null, Validators.required],
      imgSubTitle: [null, Validators.required],
      description: [null, Validators.required],
      bannerImg: [null],
    });
    this.fundInForm.valueChanges.subscribe(() => {});
  }

  fetchUpdated() {
    this.patchForm(this.itemData);
  }

  patchForm(pageContent) {
    this.pageContent = pageContent;
    this.fundInForm.patchValue({
      mainTitle: pageContent?.mainTitle,
      title: pageContent?.title,
      subTitle: pageContent?.subTitle,
      imgSubTitle: pageContent?.imgSubTitle,
      description: pageContent?.description,
    });
    this.selectFile = pageContent?.bannerImg;
    this.markAllTouched();
  }

  save() {
    return new Promise<void>((resolve, reject) => {
      this.markAllTouched();
      if (this.fundInForm.valid) {
        if (this.mode === Mode.Create) {
          let obj = this.fundInForm.value;
          obj['selectFile'] = this.selectFile;
          this.careerService.createTheamData(obj).subscribe(
            (res) => {
              this.modal.destroy();
              resolve();
              Swal.fire({
                title: 'Successful',
                text: res.message,
                icon: 'success',
              });
            },
            (err) => {
              debugger;
              reject();
              Swal.fire('Add data faild', 'error');
            },
            () => {
              reject();
            }
          );
        } else {
          let obj = this.fundInForm.value;
          obj['selectFile'] = this.selectFile;
          this.careerService.updateTheamData(obj, this.id).subscribe(
            (res) => {
              Swal.fire({
                title: 'Successful',
                text: 'Update data Succesfully',
                icon: 'success',
              });
              resolve();
            },
            (err) => {
              Swal.fire('Failed to Update', 'error');
              reject();
            },
            () => {
              reject();
            }
          );
        }
      }
    });
  }

  cancel() {
    this.modal.destroy();
  }

  markAllTouched() {
    for (const i in this.fundInForm.controls) {
      this.fundInForm.controls[i].markAsDirty();
      this.fundInForm.controls[i].updateValueAndValidity();
    }
  }

  onFileUpload(event) {
    var currentName = event.target.files[0].name;
    this.uploadFileApi(event.target.files[0])
      .then((data) => {
        this.selectFile = data;
      })
      .catch((err) => {
        Swal.fire('file upload faild', 'error');
      });
  }

  uploadFileApi(file) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      formData.append('files', file);
      this.http
        .post(
          environment.apiEndpointNew + 'public/uploadCustAdminFile',
          formData
        )
        .subscribe(
          (res: any) => {
            resolve(res.url);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
}
