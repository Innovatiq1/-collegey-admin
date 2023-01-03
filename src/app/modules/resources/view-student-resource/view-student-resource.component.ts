import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { fromEvent, Observable } from 'rxjs';
import referralCodeGenerator from 'referral-code-generator'
import { Papa } from 'ngx-papaparse';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AppConstants } from 'src/app/shared/constants/app.constants';

// Load Services
import { StudentService } from 'src/app/core/services/student/student.service';

// Componets
import { AddStudentResourceComponent } from '../add-student-resource/add-student-resource.component';
import Swal from 'sweetalert2';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}


@Component({
  selector: 'app-view-student-resource',
  templateUrl: './view-student-resource.component.html',
  styleUrls: ['./view-student-resource.component.css']
})
export class ViewStudentResourceComponent implements OnInit {

  searchText: string = "";
  resourceData = [];
  isLoading = false;
  modal: NzModalRef;
  Mode = Mode;
  resource_formData:any;

  @ViewChild("searchBox") searchBox: ElementRef;
  @ViewChild("fileImportInput") fileImportInput: any;
  keyup$: Observable<any>;
  
  msg_success: boolean = false;
  msg_danger: boolean = false;
  throw_msg:any;
  
  show_loader: boolean = false;

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private papa : Papa,
    private snackbar: MatSnackBar,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getStudentResourcesList(params);
    });
  }
  
  getStudentResourcesList(filters) {
    this.show_loader = true;
    this.studentService.getStudentResourcesList(filters).subscribe( response =>{
      this.resource_formData = response?.data;
      this.show_loader = false;
      this.isLoading         = false;
      this.resourceData      = response?.data?.docs;
      if (response?.data?.totalDocs <= response?.data?.limit || response?.data?.totalDocs <= 0) {
        this._showSnackbar("No more data found")
        this.isLoading = true;
      }
      this.ref.detectChanges();
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
      nzTitle: mode === "Create" ? "Create Student Video" : "Update Student Video",
      nzContent: AddStudentResourceComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.save().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this.getStudentResourcesList(params);
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
      nzComponentParams: {
        mode: mode,
        id: id,
      },
    });
  }

  deleteResource(listid:any)
  {
    if(confirm("Are you sure to delete this resource"))
    {
      var mylist = {id:listid};
      this.studentService.deleteStudentResource(mylist).subscribe(
        (response)=> {
          if ((response.status = 'success')) {
            Swal.fire({
              title: 'Delete Successful',
              text: response.message,
              icon: 'success',
            }); 
            this.activatedRoute.queryParams.subscribe(params => {
              this.getStudentResourcesList(params);
            });
          }
        },
      );
    }
  }

}
