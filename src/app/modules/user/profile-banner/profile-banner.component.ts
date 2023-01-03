import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AddDefaultBannerService } from 'src/app/core/services/add-default-banner.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { AddDefaultBannerComponent } from '../add-default-banner/add-default-banner.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-banner',
  templateUrl: './profile-banner.component.html',
  styleUrls: ['./profile-banner.component.css']
})
export class ProfileBannerComponent implements OnInit {

  bannerList: any = [];
  bannerFor: String;
  listProfileBanner: FormGroup;
  isActivated: any;
  modal: NzModalRef;

  constructor(
    private http: HttpClient,
    private addDefaultBannerService: AddDefaultBannerService,
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private modalService: NzModalService,
    private activatedRoute: ActivatedRoute,
  ) { 
    this.bannerFor = "profile";
    this.listProfileBanner = fb.group({
      'isDeleted': ['',Validators.required],
      'isActivated': ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.getProfileBanner(this.bannerFor);
  }

  getProfileBanner(bannerFor) {
    this.addDefaultBannerService.getBanners(bannerFor).subscribe(
      (response) => {
       this.bannerList = response;
      //  for (let index = 0; index < this.bannerList.length; index++) {
      //   this.listProfileBanner.get('isActivated').setValue(this.bannerList[index].isActivated);
      //  }
       this.ref.detectChanges();
      },
      (err) => {
        return err;
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
        this.getProfileBanner(this.bannerFor);
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
              this.getProfileBanner('profile');
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
