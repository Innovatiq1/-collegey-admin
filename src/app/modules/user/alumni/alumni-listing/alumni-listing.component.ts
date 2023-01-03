import { Component, OnInit, NgModule, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { Blog } from 'src/app/core/models/blog.model';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { NzListModule } from 'ng-zorro-antd/list';
import { AddAlumniComponent } from '../add-alumni/add-alumni.component';
import { Mentor } from 'src/app/core/models/mentor';
import { AlumniService } from 'src/app/core/services/alumni.service';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}
@Component({
  selector: 'app-alumni-listing',
  templateUrl: './alumni-listing.component.html',
  styleUrls: ['./alumni-listing.component.css']
})
export class AlumniListingComponent implements OnInit {

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
    },{title: 'Type'}
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
    private alumniService: AlumniService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private ref: ChangeDetectorRef
  ) { }

  getBlogsList(filters) {
    this.isLoading = true;
    this.alumniService.getAlumniList(filters).subscribe( (response:any) =>{
      console.log(response,"Prrrrrrr");
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
    nzTitle: mode === "Create" ? "Create Alumni" : "Update Alumni",
    nzContent: AddAlumniComponent,
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
