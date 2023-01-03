import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AddDefaultBannerService } from 'src/app/core/services/add-default-banner.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AddDefaultBannerComponent } from '../add-default-banner/add-default-banner.component';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
@Component({
  selector: 'app-mentor-project-banner',
  templateUrl: './mentor-project-banner.component.html',
  styleUrls: ['./mentor-project-banner.component.css']
})
export class MentorProjectBannerComponent implements OnInit {

  bannerList: any = [];
  bannerFor: String;
  isActivated: any;
  listMentorBanner: FormGroup;
  modal: NzModalRef;

  constructor(    
    private http: HttpClient,
    private addDefaultBannerService: AddDefaultBannerService,
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private modalService: NzModalService,
    ) 
    
    {
      this.bannerFor = "mentor"; 
      this.listMentorBanner = fb.group({
        'isDeleted': ['',Validators.required],
        'isActivated': ['',Validators.required]
      });
    }

  ngOnInit(): void {
    this.getMentorBanner(this.bannerFor);
  }

  getMentorBanner(bannerFor) {
    this.addDefaultBannerService.getBanners(bannerFor).subscribe(
      (response) => {
        this.bannerList = response;
        // for (let index = 0; index < this.bannerList.length; index++) {
        //   this.listMentorBanner.get('isActivated').setValue(this.bannerList[index].isActivated);
        // }
        this.ref.detectChanges();
      },
      (err) => {

      },
    ); 
  }

  onChange(id, activeStatus){
  this.addDefaultBannerService.editBanner(id, activeStatus).subscribe(
    (response) => {
      Swal.fire({
        title: 'Successful',
        text: 'Update succesfully',
        icon: 'success',
      });
    },
    (err) => {
      return err;
    },
  ); 
}

removeBannerImage(id:any){
  let obj = {id:id};
  this.addDefaultBannerService.removeBannerImage(obj).subscribe(
    (res) => {
      Swal.fire({
        title: 'Successful',
        text: "Banner remove successfully",
        icon: 'success',
      });
      this.ref.detectChanges();
      this.getMentorBanner(this.bannerFor);
    },
    (err) => {
      debugger;
      Swal.fire( 
        'Banner remove failed',
        'error'
      );
    },
  );
}

  //create banner modal
  openModal(id = null, item = null) {
    this.modal = this.modalService.create({
      nzTitle: "Add banner",
      nzContent: AddDefaultBannerComponent,
      nzFooter: [
        {
          label: "Create",
          show: item ? (item.isActive ? true : false) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.save().then(() => {
              componentInstance!.cancel();
              this.getMentorBanner('mentor');
            });
          },
        },
        {
          label: "Cancel",
          show: item ? (item.isActive ? true : false) : true,
          type: "default",
          onClick: (componentInstance) => {
            componentInstance!.cancel();
          },
        },
        {
          label: "close",
          show: item ? (item.isActive ? false : true) : false,
          type: "default",
          onClick: (componentInstance) => {
            componentInstance!.cancel();
          },
        },
      ],
      nzMaskClosable: false,
      nzWidth:900,
    });
  }
}
