import { Component, OnInit, NgModule, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UploadlogoService } from 'src/app/core/services/uploadlogo.service';
import { Uploaduniversitylogo } from 'src/app/core/models/uploadlogo.model';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AddUniversityLogoComponent } from 'src/app/modules/resources/logo-upload/add-university-logo/add-university-logo.component';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-university-logo',
  templateUrl: './university-logo.component.html',
  styleUrls: ['./university-logo.component.css']
})
export class UniversityLogoComponent implements OnInit {
  isLoading = false;
  uploaduniversitylogoList: any;// Uploaduniversitylogo[] = [];
  searchText: string = "";
  modal: NzModalRef;
  Mode = Mode;
  @ViewChild("searchBox") searchBox: ElementRef;
  @ViewChild("fileImportInput") fileImportInput: any;
  keyup$: Observable<any>;
  UploaduniversitylogoData: any;
  
  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private uploadlogoService: UploadlogoService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
  ) { }

  getUploadUniversityLogoList(filter) {
    this.isLoading = true;
    this.uploadlogoService.getUploadUniversityLogoList(filter).subscribe( response =>{
      this.UploaduniversitylogoData = response;
      this.uploaduniversitylogoList = this.UploaduniversitylogoData.data;
      console.log(this.uploaduniversitylogoList)
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

  // async openCreateUploaduniversitylogoModal() {
  //   const { AddLogoUploadComponent } = await import(
  //     '../add-Uploaduniversitylogo/add-Uploaduniversitylogo.component'
  //   );
  //   this.dialog
  //     .open(AddLogoUploadComponent)
  //     .afterClosed()
  //     .subscribe((Uploaduniversitylogo) => {
  //       if (Uploaduniversitylogo && Object.keys(Uploaduniversitylogo).length != 0) {
  //         this.uploaduniversitylogoList.push(Uploaduniversitylogo);
  //       }
  //     });
  // }
  

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getUploadUniversityLogoList(params);
    });
  }

  openModal(mode: Mode, id = null, item = null) {
    console.log("Clicked")
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Add Logo" : "Update Logo",
      nzContent: AddUniversityLogoComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.onSubmitForm().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this.getUploadUniversityLogoList(params);
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
        uploaduniversitylogo:item
      },
    });
  }


  activationUploadUniversityLogo(listid:any,status:any)
  {
      var mylist = {id:listid,status:status};
      this.uploadlogoService.updateUploadUniversityLogoStatus(mylist).subscribe(
        (response) => {
          Swal.fire({
            title: 'Successful',
            text: response.message,
            icon: 'success',
          });
          this.activatedRoute.queryParams.subscribe(params => {
            this.getUploadUniversityLogoList(params);
          });
        }
      );
  }

  deleteUploadUniversityLogo(listid:any){
    this.uploadlogoService.deleteUploadUniversityLogo(listid).subscribe(
      (response) => {
        Swal.fire({
          title: 'Successful',
          text: 'Logo deleted successfully',
          icon: 'success',
        });
        this.activatedRoute.queryParams.subscribe(params => {
          this.getUploadUniversityLogoList(params);
        });
      }
    );
  }


}
