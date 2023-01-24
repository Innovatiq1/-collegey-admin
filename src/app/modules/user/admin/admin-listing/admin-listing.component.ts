import { Component, OnInit, NgModule, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { AddAdminComponent } from '../add-admin/add-admin.component';
import { Mentor } from 'src/app/core/models/mentor';
import { AdminService } from 'src/app/core/services/admin.service';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-admin-listing',
  templateUrl: './admin-listing.component.html',
  styleUrls: ['./admin-listing.component.css']
})
export class AdminListingComponent implements OnInit {

  isLoading = false;
  blogsList: Mentor[] = [];
  data = [
    {
      title: 'Name'
    },
    {
      title: 'Slug'
    },
    {
      title: 'Gender'
    },
    {
      title: 'Email'
    }, {
      title: 'Type'
    }
  ];
  searchText: string = "";
  modal: NzModalRef;
  Mode = Mode;

   //filter
   searchLimit: any;
   isSearch = false;

  @ViewChild("searchBox") searchBox: ElementRef;
  @ViewChild("fileImportInput") fileImportInput: any;
  keyup$: Observable<any>;
  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private ref: ChangeDetectorRef
  ) { }

  searchUsers(searchinputText) {

    this.activatedRoute.queryParams.subscribe(params => {
      if (params.limit == undefined) {
        this.searchLimit = 10
      } else {
        this.searchLimit = params.limit
      }
      // console.log("====limit=========>", this.searchLimit);
    });

    this.isSearch = true;
    if (searchinputText == "") {
      this.isSearch = false;
      this.activatedRoute.queryParams.subscribe(params => {
        this.getBlogsList(params);
      });
    } else {
      let data = {
        username: searchinputText,
        limit: this.searchLimit
      }
      this.adminService.getUsersByName(data).subscribe((response: any) => {
        this.isLoading = false
        this.blogsList = response.data.data;
        let limit = this.searchLimit
        if (response.results <= limit || response.results <= 0) {
          this._showSnackbar("No more data found")
          this.isLoading = true;
        }
        this.ref.detectChanges();

      })
    }

  }

  getBlogsList(filters) {
    this.adminService.getAdminList(filters).subscribe((response: any) => {
      this.isLoading = false;
      this.blogsList = response.data.data;
      let limit = filters.limit ? filters.limit : 10
      if (response.totalRecords <= limit || response.totalRecords <= 0) {
        this._showSnackbar("No more data found")
        this.isLoading = true;
      }
      this.ref.detectChanges();
    }, error => {
      this.isLoading = false;
      this.snackbar.open(error.message, null, { duration: 3000 });
    });
  }

  _showSnackbar(message) {
    this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getBlogsList(params);
    });
  }
  openModal(mode: Mode, id = null, item = null) {
    console.log("Clicked")
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Create Admin" : "Update Admin",
      nzContent: AddAdminComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.onSubmitForm().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this.getBlogsList(params);
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
      nzWidth: 900,
      nzComponentParams: {
        mode: mode,
        id: id,
        mentor: item
      },
    });
  }

}
