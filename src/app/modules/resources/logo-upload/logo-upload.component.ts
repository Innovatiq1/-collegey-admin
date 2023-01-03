import { Component, OnInit, NgModule, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UploadlogoService } from 'src/app/core/services/uploadlogo.service';
import { Uploadlogo } from 'src/app/core/models/uploadlogo.model';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AddLogoUploadComponent } from 'src/app/modules/resources/logo-upload/add-logo-upload/add-logo-upload.component';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-logo-upload',
  templateUrl: './logo-upload.component.html',
  styleUrls: ['./logo-upload.component.css']
})

export class LogoUploadComponent implements OnInit {
  isLoading = false;
  uploadlogoList: any;// Uploadlogo[] = [];
  searchText: string = "";
  modal: NzModalRef;
  Mode = Mode;
  @ViewChild("searchBox") searchBox: ElementRef;
  @ViewChild("fileImportInput") fileImportInput: any;
  keyup$: Observable<any>;
  uploadlogoData: any;
  
  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private uploadlogoService: UploadlogoService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
  ) { }

  getUploadlogoList(filter) {
    this.isLoading = true;
    this.uploadlogoService.getUploadlogoList(filter).subscribe( response =>{
      this.uploadlogoData = response;
      this.uploadlogoList = this.uploadlogoData.data;
      console.log(this.uploadlogoList)
      if(response.totalDocs - (+filter.limit) < -11) {
        this._showSnackbar("No more data found")
      }
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.snackbar.open(error.message, null , {duration: 3000});
    });
  }

  _showSnackbar(message) {
    this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
  }

  // async openCreateUploadlogoModal() {
  //   const { AddLogoUploadComponent } = await import(
  //     '../add-uploadlogo/add-uploadlogo.component'
  //   );
  //   this.dialog
  //     .open(AddLogoUploadComponent)
  //     .afterClosed()
  //     .subscribe((uploadlogo) => {
  //       if (uploadlogo && Object.keys(uploadlogo).length != 0) {
  //         this.uploadlogoList.push(uploadlogo);
  //       }
  //     });
  // }
  

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getUploadlogoList(params);
    });
  }

  openModal(mode: Mode, id = null, item = null) {
    console.log("Clicked")
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Add Logo" : "Update Logo",
      nzContent: AddLogoUploadComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.onSubmitForm().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this.getUploadlogoList(params);
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


  activationUploadLogo(listid:any,status:any)
  {
      var mylist = {id:listid,status:status};
      this.uploadlogoService.updateUploadLogoStatus(mylist).subscribe(
        (response) => {
          Swal.fire({
            title: 'Successful',
            text: response.message,
            icon: 'success',
          });
          this.activatedRoute.queryParams.subscribe(params => {
            this.getUploadlogoList(params);
          });
        }
      );
  }

  deleteUploadLogo(listid:any){
    this.uploadlogoService.deleteUploadLogo(listid).subscribe(
      (response) => {
        Swal.fire({
          title: 'Successful',
          text: 'Logo deleted successfully',
          icon: 'success',
        });
        this.activatedRoute.queryParams.subscribe(params => {
          this.getUploadlogoList(params);
        });
      }
    );
  }

}
