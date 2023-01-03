import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';

// Services
import { EmailConfigurationService } from 'src/app/core/services/email-configuration/email-configuration.service';

// Componets
import Swal from 'sweetalert2';
import { AddFreeProjectJoininggComponent } from '../add-free-project-joiningg/add-free-project-joiningg.component';
enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-view-free-project-joining',
  templateUrl: './view-free-project-joining.component.html',
  styleUrls: ['./view-free-project-joining.component.css']
})
export class ViewFreeProjectJoiningComponent implements OnInit {

  modal: NzModalRef;
  Mode = Mode;
  isLoading = false;
  assignData = [];

  msg_success: boolean = false;
  msg_danger: boolean = false;
  throw_msg:any;
  
  show_loader: boolean = false;

  constructor(
    private emailConfigurationService: EmailConfigurationService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private snackbar: MatSnackBar,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getForgetPasswordTemplate(params);
    });
  }

  getForgetPasswordTemplate(filters) {
    this.isLoading   = true;
    this.show_loader = true;
    this.emailConfigurationService.getForgetPasswordTemplate(filters).subscribe( response =>{
      this.show_loader = false;
      this.isLoading   = false; 
      this.assignData  = response?.data?.docs[0]?.free_project_Joining_template;
      this.ref.detectChanges();
      if(response?.data?.totalDocs - (+filters.limit) < -11) {
        this._showSnackbar("No more data found")
      }
    }, error => {
      this.isLoading = false;
    }); 
  }

  _showSnackbar(message) {
    this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
  }

  contains(a: string, b: string) {
    return a.toLowerCase().indexOf(b.toLowerCase()) >= 0;
  }

  openModal(mode: Mode, id = null, item = null) {
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Create New" : "Update Data",
      nzContent: AddFreeProjectJoininggComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.save().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this.getForgetPasswordTemplate(params);
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
        itemData: item
      },
    });
  }



}




