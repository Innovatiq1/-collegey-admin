import { Component, OnInit, NgModule, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { Mentor } from 'src/app/core/models/mentor';
import { SchoolService } from 'src/app/core/services/school.service';
import { AddSchoolPartnerNzComponent } from '../add-school-partner-nz/add-school-partner-nz.component';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-school-partner-nz-listing',
  templateUrl: './school-partner-nz-listing.component.html',
  styleUrls: ['./school-partner-nz-listing.component.css']
})
export class SchoolPartnerNzListingComponent implements OnInit {

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
    private schoolService: SchoolService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private cdr: ChangeDetectorRef,
  ) { }

  getBlogsList(filters) {
    this.isLoading = true;
    this.schoolService.getSchoolList(filters).subscribe( (response:any) =>{
      this.isLoading = false;
      this.blogsList = response;
      if(response.totalDocs - (+filters.limit) < -11) {
        this._showSnackbar("No more data found")
      }
      this.cdr.detectChanges();
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
    nzTitle: mode === "Create" ? "Create School Partner" : "Update School Partner",
    nzContent: AddSchoolPartnerNzComponent,
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

