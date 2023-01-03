import { Component, OnInit, ElementRef, ViewChild, NgModule, Inject  } from '@angular/core';
import { StudentService } from 'src/app/core/services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { CommonService } from 'src/app/core/services/common.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { UploadlogoService } from 'src/app/core/services/uploadlogo.service';
import { Observable } from 'rxjs';
import { NzModalRef, NzModalService  } from 'ng-zorro-antd';
import { ActivatedRoute,RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { Users } from 'src/app/core/models/user.model';
import { MaterialModule } from 'src/app/material/material.module';
import { ImageSource } from 'src/app/core/enums/image-upload-source.enum';
import { error } from 'protractor';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { Uploadlogo } from 'src/app/core/models/uploadlogo.model';
import { AddAssignBadgeComponent } from 'src/app/modules/resources/badge-listing/add-assign-badge/add-assign-badge.component';
import Swal from 'sweetalert2';


enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-assign-badge',
  templateUrl: './assign-badge.component.html',
  styleUrls: ['./assign-badge.component.css']
})
export class AssignBadgeComponent implements OnInit {
  
  isLoading = false;
  assignBadgeList: any;// Uploadlogo[] = [];
  searchText: string = "";
  modal: NzModalRef;
  Mode = Mode;
  @ViewChild("searchBox") searchBox: ElementRef;
  @ViewChild("fileImportInput") fileImportInput: any;
  keyup$: Observable<any>;
  uploadlogoData: any;

  constructor(
    private uploadlogoService: UploadlogoService, 
    private snackbar: MatSnackBar, 
    private modalService: NzModalService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getAssignBadgeList(params);
    });
  }
 
  getAssignBadgeList(filter) {
    this.isLoading = true;
    this.uploadlogoService.getAssignBadgeList(filter).subscribe( response =>{
      this.uploadlogoData = response;
      this.assignBadgeList = this.uploadlogoData.data;
      console.log(this.assignBadgeList)
      if(response.totalDocs - (+filter.limit) < -11) {
        this._showSnackbar("No more data found")
      }
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.snackbar.open(error.message, null , {duration: 3000});
    });
  }

  openModal(mode: Mode, id = null, item = null) {
    console.log("Clicked")
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Assigned Badge" : "Update Assigned Badge",
      nzContent: AddAssignBadgeComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.onSubmitForm().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this.getAssignBadgeList(params);
            });
            });
          },
        },
        {
          label: "Cancel",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "default",
          onClick: (componentInstance) => {
            componentInstance!.cancel();
          },
        },
        {
          label: "close",
          show: item ? (item.isDeleted ? true : false) : false,
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
        uploadlogo:item
      },
    });
  }


  updateAssignBadgeStatus(listid:any,status:any)
  {
      var mylist = {id:listid,status:status};
      this.uploadlogoService.updateAssignBadgeStatus(mylist).subscribe(
        (response) => {
          Swal.fire({
            title: 'Successful',
            text: response.message,
            icon: 'success',
          });
          this.activatedRoute.queryParams.subscribe(params => {
            this.getAssignBadgeList(params);
          });
        }
      );
  }

  deleteAssignBadge(listid:any){
    this.uploadlogoService.deleteAssignBadge(listid).subscribe(
      (response) => {
        Swal.fire({
          title: 'Successful',
          text: 'Assigned badge deleted successfully',
          icon: 'success',
        });
        this.activatedRoute.queryParams.subscribe(params => {
          this.getAssignBadgeList(params);
        });
      }
    );
  }

  _showSnackbar(message) {
    this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
  }


}
