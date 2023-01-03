import { Component, OnInit, NgModule, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { AddCounsellorsComponent } from '../add-counsellors/add-counsellors.component';
import { Mentor } from 'src/app/core/models/mentor';
import { CounsellorService } from 'src/app/core/services/counsellor.service';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}
@Component({
  selector: 'app-counsellor-listing',
  templateUrl: './counsellor-listing.component.html',
  styleUrls: ['./counsellor-listing.component.css']
})
export class CounsellorListingComponent implements OnInit {
  isLoading = false;
  blogsList: Mentor[] =[];
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
    },
    { title: 'Type'}

  ];
  searchText: string = "";
  modal: NzModalRef;
  Mode = Mode;
  @ViewChild("searchBox") searchBox: ElementRef;
  @ViewChild("fileImportInput") fileImportInput: any;
  keyup$: Observable<any>;
  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private counsellorService: CounsellorService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private ref: ChangeDetectorRef
  ) { }

  getBlogsList(filters) {
    this.isLoading = true;
    this.counsellorService.getCounsellorList(filters).subscribe( (response:any) =>{
      this.isLoading = false;
      this.blogsList = response;
      this.ref.detectChanges();
      if(response.totalDocs - (+filters.limit) < -11) {
        this._showSnackbar("No more data found")
      }
    }, error => {
      this.isLoading = false;
      this.snackbar.open(error.message, null , {duration: 3000});
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
    nzTitle: mode === "Create" ? "Create Counsellor" : "Update Counsellor",
    nzContent: AddCounsellorsComponent,
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
    nzWidth:900,
    nzComponentParams: {
      mode: mode,
      id: id,
      mentor:item
    },
  });
}

}
