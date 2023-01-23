import { Component, OnInit, NgModule, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Blog } from 'src/app/core/models/blog.model';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Observable, Subject } from 'rxjs';
import { NzListModule } from 'ng-zorro-antd/list';
import { AddStudentNzComponent } from '../add-student-nz/add-student-nz.component';
import { ShowStudentInformationComponent } from '../show-student-information/show-student-information.component';
import { StudentService } from 'src/app/core/services/student.service';
import { Mentor } from 'src/app/core/models/mentor';
import { takeUntil } from 'rxjs/operators';
import { link } from 'fs';
import * as Excel from 'exceljs';
import * as fs from 'file-saver';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/core/services/user.service';
enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}
@Component({
  selector: 'app-student-nz-listing',
  templateUrl: './student-nz-listing.component.html',
  styleUrls: ['./student-nz-listing.component.css']
})
export class StudentNzListingComponent implements OnInit {

  private ngUnsubscribe = new Subject();
  response: any;
  userid: any;
  downloadLink: any;

  isLoading = false;
  isSearch = false;
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
  @ViewChild("searchBox") searchBox: ElementRef;
  @ViewChild("fileImportInput") fileImportInput: any;
  keyup$: Observable<any>;
  searchLimit: any;
  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {

  }

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
        this.getStudentList(params);
      });
    } else {
      let data = {
        username: searchinputText,
        limit: this.searchLimit
      }
      this.userService.getUsersByName(data).subscribe((response: any) => {
        this.isLoading = false
        this.blogsList = response.data.data;
        let limit = this.searchLimit
        if (response.results <= limit || response.results <= 0) {
          this._showSnackbar("No more data found")
          this.isLoading = true;
        }
        this.cdr.detectChanges();

      })
    }

  }

  getStudentList(filters) {
    this.studentService.getStudentsList(filters).subscribe((response: any) => {
      this.isLoading = false;
      this.blogsList = response.data.data;



      let limit = filters.limit ? filters.limit : 10

      if (response.totalRecords <= limit || response.totalRecords <= 0) {
        this._showSnackbar("No more data found")
        this.isLoading = true;
      }
      this.cdr.detectChanges();
    }, error => {
      this.isLoading = false;
      this.snackbar.open(error.message, null, { duration: 3000 });
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
      if (this.isSearch == true) {

        this.searchUsers(this.searchText);
      } else {
        this.getStudentList(params);
      }

    });

  }
  
  openModal(mode: Mode, id = null, item = null) {
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Create Student" : "Update Student",
      nzContent: AddStudentNzComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.onSubmitForm().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this.getStudentList(params);
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

  openStudentDetailsModal(mode: Mode, id = null, item = null) {
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Student Information" : "Student Information",
      nzContent: ShowStudentInformationComponent,
      nzFooter: [
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
        mentor: item
      },
    });
  }

  // DownloadAsExcel(){
  //   let obj = {type:"student"};
  //   // this.studentService.getDownload(obj).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
  //   //   this.response = data;
  //   //   console.log(this.response)
  //   // })
  //   this.studentService.getDownload(obj).subscribe((data: any) => {
  //     this.response = data;
  //     console.log("this is response",this.response)
  //     // this.response.blob().then((excelBlob) => {
  //     //   const excelBlobURL = URL.createObjectURL(excelBlob);
  //     //   this.downloadLink.href = excelBlobURL;
  //     // });
  //     // let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //     // const fileName = `file.xlsx`;
  //     // console.log("this is  blob",blob)
  //     // let file = new File([blob], fileName);
  //     // console.log("this is file",file)
  //     // let fileUrl = URL.createObjectURL(file);

  //       const blob = new Blob([data], { type: 'application/octet-stream' });
  //       const url= window.URL.createObjectURL(blob);
  //       window.open(url);
  //       // var link = document.createElement('a');
  //       // link.href = window.URL.createObjectURL(this.response);
  //       // link.download = this.response.path;
  //       // link.click();

  //   });
  // }

  // DownloadAsExcel(){
  //   let obj = {type:"student"};
  //   // this.studentService.getDownload(obj).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
  //   //   this.response = data;
  //   //   console.log(this.response)
  //   // })
  //   this.studentService.getDownload(obj).subscribe((data: any) => {
  //     this.response = data;
  //     console.log("this is response",this.response)
  //     const workbook = new Excel.Workbook();
  //     var worksheet =  workbook.addWorksheet('sheet');
  //     // worksheet.columns = [
  //     //   { header: 'Id', key: 'id', width: 10 },
  //     //   { header: 'Name', key: 'name', width: 32 }
  //     // ];
  //     worksheet.columns = [
  //       { header: "S no.", key: "s_no", width: 10 }, 
  //       { header: " Name", key: "name", width: 10 },

  //       { header: "Email Id", key: "email", width: 10 },
  //       { header: "Gender", key: "gender", width: 10 },
  //       { header: "Type", key: "type", width: 10 },
  //       { header: "Status", key: "Active", width: 10 },
  //       { header: "PhoneNumber", key: "phone", width: 20 },
  //       { header: "studentType", key: "studentType", width: 20 },
  //       { header: "Dob", key: "Dob", width: 20 },
  //       { header: "Age", key: "age", width: 20 },
  //      // { header: "ParentName", key: "pName", width: 20 },
  //       //{ header: "ParentPhone", key: "pNumber", width: 20 },
  //   ];
  //  // Looping through User data
  //   let counter = 1;
  //   data.forEach((user) => {
  //     user.s_no = counter;
  //     user.phone = user.phone_number[0]&&user.phone_number[0].extension?user.phone_number[0].extension+"-"+user.phone_number[0].number:""
  //     user.Dob = user.student_profile&&user.student_profile.ways_to_be_in_touch?user.student_profile.ways_to_be_in_touch.dob:""
  //     user.age = user.student_profile&&user.student_profile.ways_to_be_in_touch?user.student_profile.ways_to_be_in_touch.age:""
  //     //user.pName = user.student_profile&&user.student_profile.ways_to_be_in_touch.parents_details?user.student_profile.ways_to_be_in_touch.parents_details.name:""

  //    // user.pNumber = user.student_profile&&user.student_profile.ways_to_be_in_touch&&user.student_profile.ways_to_be_in_touch.parents_details.phone_number&&user.student_profile.ways_to_be_in_touch.parents_details.phone_number.extension?user.student_profile.ways_to_be_in_touch.parents_details.phone_number.extension:""+"-"+user.student_profile.ways_to_be_in_touch.parents_details.phone_number.number?user.student_profile.ways_to_be_in_touch.parents_details.phone_number.number:""

  //     worksheet.addRow(user); // Add data in worksheet
  //     //console.log("=========",user.phone_number[0])
  //     counter++;
  //   });
  //    var buff = workbook.xlsx.writeBuffer().then(function (data) {
  //       var blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
  //       fs.saveAs(blob, "users.xlsx");
  //     });
  //     // let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //     // const fileName = `file.xlsx`;
  //     // console.log("this is  blob",blob)
  //     // let file = new File([blob], fileName);
  //     // console.log("this is file",file)
  //     // let fileUrl = URL.createObjectURL(file);
  //   });
  // }
  
  DownloadAsExcel() {
    let obj = { type: "student" };
    // this.studentService.getDownload(obj).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
    //   this.response = data;
    //   console.log(this.response)
    // })

    this.studentService.getDownload(obj).subscribe((data: any) => {
      this.response = data;
      console.log("this is response", this.response)
      const workbook = new Excel.Workbook();
      var worksheet = workbook.addWorksheet('sheet');
      // worksheet.columns = [
      //   { header: 'Id', key: 'id', width: 10 },
      //   { header: 'Name', key: 'name', width: 32 }
      // ];
      worksheet.columns = [
        { header: "S no.", key: "s_no", width: 10 },
        { header: "First Name", key: "name", width: 10 },
        { header: "Last Name", key: "last_name", width: 10 },
        { header: "Email Id", key: "email", width: 10 },
        { header: "PhoneNumber", key: "phone", width: 20 },
        { header: "Gender", key: "gender", width: 10 },
        { header: "Dob", key: "Dob", width: 20 },
        { header: "Age", key: "age", width: 20 },

        { header: "Type", key: "type", width: 10 },
        { header: "Status", key: "status", width: 10 },
        { header: "Student Type", key: "studentType", width: 20 },

        // Geography Area

        { header: "Country", key: "country", width: 20 },
        { header: "State", key: "state", width: 20 },
        { header: "City", key: "city", width: 20 },
        { header: "Citizenship", key: "citizenship", width: 20 },
        { header: "Timezone", key: "timezone", width: 20 },

        // Interest Area
        { header: "Interest Area", key: "interest_area", width: 20 },
        { header: "Favorite Subjects", key: "fav_subjects", width: 20 },
        { header: "Key Problems", key: "key_problems", width: 20 },
        { header: "Second Problems", key: "secondkey_problems", width: 20 },

        // Favorites Area
        { header: "Name people who inspire you 1", key: "people_who_inspire_you1", width: 30 },
        { header: "Name people who inspire you 2", key: "people_who_inspire_you2", width: 30 },
        { header: "Your favourite books 1", key: "fav_books1", width: 20 },
        { header: "Your favourite books 2", key: "fav_books2", width: 20 },
        { header: "Favourite documentaries/ movies 1", key: "fav_movies1", width: 20 },
        { header: "Favourite documentaries/ movies 2", key: "fav_movies2", width: 20 },
        { header: "Favorite activities on the internet. 1", key: "fav_activites1", width: 20 },
        { header: "Favorite activities on the internet. 2", key: "fav_activites2", width: 20 },

        { header: "Favourite websites 1", key: "fav_websites1", width: 20 },
        { header: "Favourite websites 2", key: "fav_websites2", width: 20 },
        { header: "Favourite websites 3", key: "fav_websites3", width: 20 },

        { header: "Favorite text messaging service", key: "fav_message_service", width: 20 },

        // Future Education Plans
        { header: "You Want To Pursue", key: "grade_purse", width: 20 },
        { header: "Expected Year Of Complitetion", key: "expected_year_to_complete", width: 20 },
        { header: "Education Country", key: "preferred_countries", width: 20 },

        // Preferences
        { header: "Apply for scholarships", key: "wish_to_apply_for_scholarships", width: 20 },
        { header: "How Important is it", key: "wish_to_apply_for_scholarships_imoprtance", width: 20 },
        { header: "Pay per year for your future education", key: "how_would_like_to_pay", width: 20 },
        { header: "Pay per year for your future education Privacy", key: "how_would_like_to_pay_privacy", width: 20 },
        { header: "Approximate family income per year", key: "family_income", width: 20 },
        { header: "Approximate family income per year Privacy", key: "family_income_privacy", width: 20 },
        { header: "Interested in taking a Gap Year or a Summer Program", key: "interested_in_gap", width: 20 },

        // Personal
        { header: "Parents Name", key: "parents_name", width: 20 },
        { header: "Parents Email", key: "parents_email", width: 20 },
        { header: "Parents Phone", key: "parents_phone_number", width: 20 },
        { header: "Relation", key: "your_relation", width: 20 },

        { header: "School Counselor Name", key: "school_counselor_name", width: 20 },
        { header: "School Counselor Email", key: "school_counselor_email", width: 20 },
        { header: "School Counselor Privacy", key: "school_counselor_privacy", width: 20 },
        
      ];
      // Looping through User data
      let counter = 1;
      data.forEach((user) => {
        //console.log("extension",user.student_profile.ways_to_be_in_touch.phone_number.extension);

        user.s_no = counter;
        user.phone = user.student_profile && user.student_profile.ways_to_be_in_touch && user.student_profile.ways_to_be_in_touch.phone_number ? user.student_profile.ways_to_be_in_touch.phone_number.number ? user.student_profile.ways_to_be_in_touch.phone_number.extension + "-" + user.student_profile.ways_to_be_in_touch.phone_number.number : ""  : ""
        user.Dob   = user.student_profile && user.student_profile.ways_to_be_in_touch ? user.student_profile.ways_to_be_in_touch.dob : ""
        user.age   = user.student_profile && user.student_profile.ways_to_be_in_touch ? user.student_profile.ways_to_be_in_touch.age : ""
        
        // Geography Area
        user.city   = user.cityObj && user.cityObj ? user.cityObj : "";
        user.state   = user.stateObj && user.stateObj ? user.stateObj : "";
        user.country   = user.countryObj && user.countryObj ? user.countryObj : "";
        user.citizenship   = user.student_profile && user.student_profile?.geography ? user.student_profile?.geography?.citizenship : ""
        user.timezone = user.student_profile && user.student_profile?.geography ? user.student_profile?.geography?.timezone : ""

        // Interest Area
        user.interest_area   = user.student_profile && user.student_profile?.interest ? user.student_profile?.interest?.interest_area.join(', ') : ""
        user.fav_subjects   = user.student_profile && user.student_profile?.interest ? user.student_profile?.interest?.fav_subjects.join(', ') : ""
        user.key_problems   = user.student_profile && user.student_profile?.interest ? user.student_profile?.interest?.key_problems : ""
        user.secondkey_problems   = user.student_profile && user.student_profile?.interest ? user.student_profile?.interest?.secondkey_problems : ""
        
        // Favorites Area
        user.people_who_inspire_you1   = user.student_profile && user.student_profile?.know_you_better ? user.student_profile?.know_you_better?.people_who_inspire_you[0]?.name : "";
        user.people_who_inspire_you2   = user.student_profile && user.student_profile?.know_you_better ? user.student_profile?.know_you_better?.people_who_inspire_you[1]?.name : "";
        user.fav_books1   = user.student_profile && user.student_profile?.know_you_better ? user.student_profile?.know_you_better?.fav_books[0]?.name : "";
        user.fav_books2   = user.student_profile && user.student_profile?.know_you_better ? user.student_profile?.know_you_better?.fav_books[1]?.name : "";

        user.fav_movies1   = user.student_profile && user.student_profile?.know_you_better ? user.student_profile?.know_you_better?.fav_movies[0]?.name : "";
        user.fav_movies2   = user.student_profile && user.student_profile?.know_you_better ? user.student_profile?.know_you_better?.fav_movies[1]?.name : "";

        user.fav_activites1   = user.student_profile && user.student_profile?.know_you_better ? user.student_profile?.know_you_better?.fav_movies[0]?.name : "";
        user.fav_activites2   = user.student_profile && user.student_profile?.know_you_better ? user.student_profile?.know_you_better?.fav_movies[1]?.name : "";

        user.fav_websites1   = user.student_profile && user.student_profile?.know_you_better ? user.student_profile?.know_you_better?.fav_websites1 : "";
        user.fav_websites2   = user.student_profile && user.student_profile?.know_you_better ? user.student_profile?.know_you_better?.fav_websites2 : "";
        user.fav_websites3   = user.student_profile && user.student_profile?.know_you_better ? user.student_profile?.know_you_better?.fav_websites3 : "";
        user.fav_message_service = user.student_profile && user.student_profile?.know_you_better ? user.student_profile?.know_you_better?.fav_message_service[0] : "";

        // Future Education Plans
        user.grade_purse = user.student_profile && user.student_profile?.headed ? user.student_profile?.headed?.expected_year_to_start?.grade : "";
        user.expected_year_to_complete = user.student_profile && user.student_profile?.headed ? user.student_profile?.headed?.expected_year_to_start?.year : "";

        let preferredCountry = [];
        if(user.student_profile && user.student_profile?.headed)
        {
          user.student_profile?.headed?.preferred_countries.map((data,idx)=>{ 
            preferredCountry.push(data?.item_text);
          });
          user.preferred_countries = preferredCountry.join(', ');
        }
        
        // Preferences
        user.wish_to_apply_for_scholarships = user.student_profile && user.student_profile?.prefrences ? user.student_profile?.prefrences?.wish_to_apply_for_scholarships?.answer : "";
        user.wish_to_apply_for_scholarships_imoprtance = user.student_profile && user.student_profile?.prefrences ? user.student_profile?.prefrences?.wish_to_apply_for_scholarships?.imoprtance : "";

        user.how_would_like_to_pay = user.student_profile && user.student_profile?.prefrences ? user.student_profile?.prefrences?.how_would_like_to_pay : "";
        user.how_would_like_to_pay_privacy = user.student_profile && user.student_profile?.prefrences ? user.student_profile?.prefrences?.future_privacy : "";
        
        user.family_income = user.student_profile && user.student_profile?.prefrences ? user.student_profile?.prefrences?.family_income : "";
        user.family_income_privacy = user.student_profile && user.student_profile?.prefrences ? user.student_profile?.prefrences?.privacy : "";
        user.interested_in_gap = user.student_profile && user.student_profile?.prefrences ? user.student_profile?.prefrences?.interested_in_gap : "";

        // Personal
        user.parents_name = user.student_profile && user.student_profile?.ways_to_be_in_touch ? user.student_profile?.ways_to_be_in_touch?.parents_details?.name : "";
        user.parents_email = user.student_profile && user.student_profile?.ways_to_be_in_touch ? user.student_profile?.ways_to_be_in_touch?.parents_details?.email : "";

        user.parents_phone_number = user.student_profile && user.student_profile.ways_to_be_in_touch && user.student_profile.ways_to_be_in_touch?.parents_details?.phone_number ? user.student_profile.ways_to_be_in_touch?.parents_details?.phone_number?.number ? user.student_profile.ways_to_be_in_touch?.parents_details?.phone_number.extension + "-" + user.student_profile.ways_to_be_in_touch?.parents_details?.phone_number?.number : ""  : ""

        user.your_relation = user.student_profile && user.student_profile?.ways_to_be_in_touch ? user.student_profile?.ways_to_be_in_touch?.parents_details?.relation : "";
        
        user.school_counselor_name = user.student_profile && user.student_profile?.ways_to_be_in_touch ? user.student_profile?.ways_to_be_in_touch?.school_counselor[0]?.email : "";
        user.school_counselor_email = user.student_profile && user.student_profile?.ways_to_be_in_touch ? user.student_profile?.ways_to_be_in_touch?.school_counselor[0]?.email : "";
        user.school_counselor_privacy = user.student_profile && user.student_profile?.ways_to_be_in_touch ? user.student_profile?.ways_to_be_in_touch?.school_counselor[0]?.privacy : "";
       
        worksheet.addRow(user); // Add data in worksheet
        //console.log("=========",user.phone_number[0])
        counter++;
      });
      var buff = workbook.xlsx.writeBuffer().then(function (data) {
        var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
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

  updateUserStatus(listid: any, status: any) {
    var mylist = { id: listid, status: status, userType: 'Student' };
    this.studentService.updateUserStatus(mylist).subscribe(
      (response) => {
        Swal.fire({
          title: 'Successful',
          text: response.message,
          icon: 'success',
        });

        this.activatedRoute.queryParams.subscribe(params => {
          this.getStudentList(params);
        });
      }
    );
  }

}
