import { Component, OnInit, NgModule, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UploadlogoService } from 'src/app/core/services/uploadlogo.service';
import { Uploadcollegelogo } from 'src/app/core/models/uploadlogo.model';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AddCollegeyLogoComponent } from 'src/app/modules/resources/logo-upload/add-collegey-logo/add-collegey-logo.component';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-collegey-logo',
  templateUrl: './collegey-logo.component.html',
  styleUrls: ['./collegey-logo.component.css']
})
export class CollegeyLogoComponent implements OnInit {
  isLoading = false;
  uploadcollegelogoList: any;// Uploadcollegelogo[] = [];
  searchText: string = "";
  modal: NzModalRef;
  Mode = Mode;
  @ViewChild("searchBox") searchBox: ElementRef;
  @ViewChild("fileImportInput") fileImportInput: any;
  keyup$: Observable<any>;
  UploadcollegelogoData: any;
  
  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private uploadlogoService: UploadlogoService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
  ) { }

  getUploadCollegeLogoList(filter) {
    this.isLoading = true;
    this.uploadlogoService.getUploadCollegeLogoList(filter).subscribe( response =>{
      this.UploadcollegelogoData = response;
      this.uploadcollegelogoList = this.UploadcollegelogoData.data;
      console.log(this.uploadcollegelogoList)
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

  // async openCreateUploadcollegelogoModal() {
  //   const { AddLogoUploadComponent } = await import(
  //     '../add-Uploadcollegelogo/add-Uploadcollegelogo.component'
  //   );
  //   this.dialog
  //     .open(AddLogoUploadComponent)
  //     .afterClosed()
  //     .subscribe((Uploadcollegelogo) => {
  //       if (Uploadcollegelogo && Object.keys(Uploadcollegelogo).length != 0) {
  //         this.uploadcollegelogoList.push(Uploadcollegelogo);
  //       }
  //     });
  // }
  

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getUploadCollegeLogoList(params);
    });
  }

  openModal(mode: Mode, id = null, item = null) {
    console.log("Clicked")
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Add Logo" : "Update Logo",
      nzContent: AddCollegeyLogoComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.onSubmitForm().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this.getUploadCollegeLogoList(params);
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
        uploadcollegelogo:item
      },
    });
  }


  activationUploadCollegeLogo(listid:any,status:any)
  {
      var mylist = {id:listid,status:status};
      this.uploadlogoService.updateUploadCollegeLogoStatus(mylist).subscribe(
        (response) => {
          Swal.fire({
            title: 'Successful',
            text: response.message,
            icon: 'success',
          });
          this.activatedRoute.queryParams.subscribe(params => {
            this.getUploadCollegeLogoList(params);
          });
        }
      );
  }

  deleteUploadCollegeLogo(listid:any){
    this.uploadlogoService.deleteUploadCollegeLogo(listid).subscribe(
      (response) => {
        Swal.fire({
          title: 'Successful',
          text: 'Logo deleted successfully',
          icon: 'success',
        });
        this.activatedRoute.queryParams.subscribe(params => {
          this.getUploadCollegeLogoList(params);
        });
      }
    );
  }
}
