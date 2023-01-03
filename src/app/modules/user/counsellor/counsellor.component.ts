import { Component, OnInit, NgModule, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { Blog } from 'src/app/core/models/blog.model';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { NzListModule } from 'ng-zorro-antd/list';
import { AddCounsellorsComponent } from './add-counsellors/add-counsellors.component';
import { CounsellorService } from 'src/app/core/services/counsellor.service';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}
@Component({
  selector: 'app-counsellor',
  templateUrl: './counsellor.component.html',
  styleUrls: ['./counsellor.component.css']
})
export class CounsellorComponent implements OnInit {

  isLoading = false;
  blogsList: any;
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
    }
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
  ) { }

  getBlogsList(filters) {
    this.isLoading = true;
    this.counsellorService.getCounsellorList(filters).subscribe( response =>{
      console.log(response,"Prrrrrrr");
      this.isLoading = false;
      this.blogsList = response;
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

  // async openCreateBlogModal() {
  //   const { AddBlogComponent } = await import(
  //     '../add-blog/add-blog.component'
  //   );
  //   this.dialog
  //     .open(AddBlogComponent)
  //     .afterClosed()
  //     .subscribe((blog) => {
  //       if (blog && Object.keys(blog).length != 0) {
  //         this.blogsList.push(blog);
  //       }
  //     });
  // }
  

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getBlogsList(params);
  });
}
openModal(mode: Mode, id = null, item = null) {
  console.log("Clicked")
  this.modal = this.modalService.create({
    nzTitle: mode === "Create" ? "Create Blog" : "Update Blog",
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
      // blog:item
    },
  });
}

}
