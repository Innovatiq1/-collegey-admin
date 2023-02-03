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
import { AddAlluserComponent } from '../add-alluser/add-alluser.component';
import { Mentor } from 'src/app/core/models/mentor';
import { UserService } from 'src/app/core/services/user.service';
import { StudentService } from 'src/app/core/services/student.service';
import * as Excel from 'exceljs';
import * as fs from 'file-saver';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}
@Component({
  selector: 'app-alluser-listing',
  templateUrl: './alluser-listing.component.html',
  styleUrls: ['./alluser-listing.component.css']
})
export class AlluserListingComponent implements OnInit {
  response: any;
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
    { title: 'Type' }
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
    private userService: UserService,
    private blogsService: StudentService,
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
      this.userService.getUsersByName1(data).subscribe((response: any) => {
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
    this.userService.getUserList(filters).subscribe((response: any) => {
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

  DownloadAsExcel(){
    let obj = {type:"student"};
    // this.blogsService.getDownload(obj).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
    //   this.response = data;
    //   console.log(this.response)
    // })
    this.blogsService.getDownload(obj).subscribe((data: any) => {
      this.response = data;
      console.log("this is response",this.response)
      const workbook = new Excel.Workbook();
      var worksheet =  workbook.addWorksheet('sheet');
      // worksheet.columns = [
      //   { header: 'Id', key: 'id', width: 10 },
      //   { header: 'Name', key: 'name', width: 32 }
      // ];
      worksheet.columns = [
        { header: "S no.", key: "s_no", width: 10 }, 
        { header: " Name", key: "name", width: 10 },
        
        { header: "Email Id", key: "email", width: 10 },
        { header: "Gender", key: "gender", width: 10 },
        { header: "Type", key: "type", width: 10 },
        { header: "Status", key: "Active", width: 10 },
        { header: "PhoneNumber", key: "phone", width: 20 },
        { header: "studentType", key: "studentType", width: 20 },
        { header: "Dob", key: "Dob", width: 20 },
        { header: "Age", key: "age", width: 20 },
       // { header: "ParentName", key: "pName", width: 20 },
        //{ header: "ParentPhone", key: "pNumber", width: 20 },
    ];
   // Looping through User data
    let counter = 1;
    data.forEach((user) => {
      user.s_no = counter;
      user.phone = user.phone_number[0]&&user.phone_number[0].extension?user.phone_number[0].extension+"-"+user.phone_number[0].number:""
      user.Dob = user.student_profile&&user.student_profile.ways_to_be_in_touch?user.student_profile.ways_to_be_in_touch.dob:""
      user.age = user.student_profile&&user.student_profile.ways_to_be_in_touch?user.student_profile.ways_to_be_in_touch.age:""
      //user.pName = user.student_profile&&user.student_profile.ways_to_be_in_touch.parents_details?user.student_profile.ways_to_be_in_touch.parents_details.name:""
      
     // user.pNumber = user.student_profile&&user.student_profile.ways_to_be_in_touch&&user.student_profile.ways_to_be_in_touch.parents_details.phone_number&&user.student_profile.ways_to_be_in_touch.parents_details.phone_number.extension?user.student_profile.ways_to_be_in_touch.parents_details.phone_number.extension:""+"-"+user.student_profile.ways_to_be_in_touch.parents_details.phone_number.number?user.student_profile.ways_to_be_in_touch.parents_details.phone_number.number:""
  
      worksheet.addRow(user); // Add data in worksheet
      //console.log("=========",user.phone_number[0])
      counter++;
    });
     var buff = workbook.xlsx.writeBuffer().then(function (data) {
        var blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        fs.saveAs(blob, "users.xlsx");
      });
      // let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      // const fileName = `file.xlsx`;
      // console.log("this is  blob",blob)
      // let file = new File([blob], fileName);
      // console.log("this is file",file)
      // let fileUrl = URL.createObjectURL(file);
    });
  }

  openModal(mode: Mode, id = null, item = null) {
    console.log("Clicked");
    console.log("item",item);
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Create User" : "Update User",
      nzContent: AddAlluserComponent,
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
