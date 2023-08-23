import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AnnouncementService } from 'src/app/core/services/announcement.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { NewUniversityComponent } from '../new-university/new-university/new-university.component';
import { UniversityService } from 'src/app/core/services/university.service';
import Swal from 'sweetalert2';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent implements OnInit {

  isLoading = false;
  announcementData: any[] = [];
  modal: NzModalRef;
  mode: String;
  Mode = Mode;
  

  constructor(
    private announcementService: AnnouncementService,
    
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private universityService:UniversityService,
    //private uni
    ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getUniversityList(params);
    });
  }

  openModal(mode: Mode, id = null, item = null) {
    console.log("=========",item)
    console.log("mode",mode)
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Create University" : "Update University",
      nzContent: NewUniversityComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isActivated ? true : false) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.save().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this.getUniversityList(params);
              });
            });
          },
        },
        {
          label: "Cancel",
          show: item ? (item.isActivated ? true : false) : true,
          type: "default",
          onClick: (componentInstance) => {
            componentInstance!.cancel();
          },
        },
        {
          label: "close",
          show: item ? (item.isActivated ? false : true) : false,
          type: "default",
          onClick: (componentInstance) => {
            componentInstance!.cancel();
          },
        },
      ],
      nzMaskClosable: false,
      nzWidth:900,
      nzComponentParams: {
        mode: mode,
        id: id,
      },
    });
  }


  getUniversityList(filter) {
    this.universityService.getUniversityLists(filter).subscribe((res)=>{
      this.isLoading = false;
      this.announcementData = res.data.data;
      let limit = filter.limit ? filter.limit : 10
      if (res.totalRecords <= limit || res.totalRecords <= 0) {
        this._showSnackbar("No more data found")
        this.isLoading = true;
      }
      this.cdr.detectChanges();


      console.log("res====",res.totalRecords);
      
      this.cdr.detectChanges();
    })
  }

  _showSnackbar(message) {
    this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
  }
  deleteUniversity(universityId) {
    this.universityService.deleteUniversity(universityId).subscribe((res)=> {
      if(res.message==="University Deleted Successfully"){
      Swal.fire({
        title: 'Successful',
        text: 'Delete University Successfully',
        icon: 'success',
      });
    }
      this.activatedRoute.queryParams.subscribe(params => {
        this.getUniversityList(params);
      });
      this.cdr.detectChanges();
    });
   
  }
}
