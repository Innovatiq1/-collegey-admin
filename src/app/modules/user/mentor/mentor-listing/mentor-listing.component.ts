import { Component, OnInit, NgModule, ElementRef, ViewChild, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { AddMentorsComponent } from '../add-mentors/add-mentors.component';
import { ShowMentorInformationComponent } from '../show-mentor-information/show-mentor-information.component';
import { Mentor } from 'src/app/core/models/mentor';
import { MentorService } from 'src/app/core/services/mentor.service';
import * as Excel from 'exceljs';
import * as fs from 'file-saver';
import { StudentService } from 'src/app/core/services/student.service';
import Swal from 'sweetalert2';

import { UserService } from 'src/app/core/services/user.service';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}
@Component({
  selector: 'app-mentor-listing',
  templateUrl: './mentor-listing.component.html',
  styleUrls: ['./mentor-listing.component.css']
})
export class MentorListingComponent implements OnInit {
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
    {
      title: 'Type'
    }
  ];
  searchText: string = "";
  modal: NzModalRef;
  Mode = Mode;
  @ViewChild("searchBox") searchBox: ElementRef;
  @ViewChild("fileImportInput") fileImportInput: any;
  keyup$: Observable<any>;
  paramData: any;
  mentorStatus: String = 'both';
  currentPage: number = 1;
  currentLimit: number = 10;
  pageSkip: number = 0;
  mentorData: any[] = [];
  mentorLoadMore: Boolean = true;
  changed: Boolean = false;

   //filter
   searchLimit: any;
   isSearch = false;

  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private mentorService: MentorService,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private ref: ChangeDetectorRef,
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
        this.getMentorList(params);
      });
    } else {
      let data = {
        username: searchinputText,
        limit: this.searchLimit
      }
      this.mentorService.getUsersByName(data).subscribe((response: any) => {
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

  getMentorList(filters) {
    this.mentorService.getMentorList(filters).subscribe((response: any) => {
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
      this.getMentorList(params);
      this.paramData = params;
    });
  }

  openMentorDetailsModal(mode: Mode, id = null, item = null) {
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Mentor Information" : "Mentor Information",
      nzContent: ShowMentorInformationComponent,
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


  DownloadAsExcel() {
    let obj
    if (this.mentorStatus == 'both') {
      obj = { type: "mentor" };
    } else if (this.mentorStatus == 'true') {
      obj = { type: "mentor", status: 'true' };
    } else if (this.mentorStatus == 'false') {
      obj = { type: "mentor", status: 'false' };
    }

    // this.studentService.getDownload(obj).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
    //   this.response = data;
    //   console.log(this.response)
    // })
    this.studentService.getDownloadMentor(obj).subscribe((data: any) => {
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
        { header: "Full Name", key: "name", width: 10 },
        { header: "Email Id", key: "email", width: 10 },
        { header: "PhoneNumber", key: "phone", width: 20 },
        
        { header: "Type", key: "type", width: 10 },
       
        { header: "Status", key: "Active", width: 10 },

        // Profile Data
        { header: "Country", key: "country", width: 20 },
        { header: "State", key: "state", width: 20 },
        { header: "City", key: "city", width: 20 },
        { header: "Timezone", key: "timezone", width: 20 },
        { header: "Professional Title", key: "professional_title", width: 20 },
        { header: "Website", key: "website", width: 20 },
        { header: "Experience in years", key: "experience_year", width: 20 },
        { header: "Last Education Institute", key: "last_education_institute", width: 20 },
        { header: "Last Education Degree", key: "last_education_degree", width: 20 },
        { header: "Industry", key: "industry", width: 20 },
        { header: "Your area of expertise", key: "your_area_of_expertise", width: 20 },
        { header: "Project Interests", key: "project_interests", width: 20 },
        { header: "How can you contribute?", key: "how_can_you_contribute", width: 20 },
        { header: "Favorite Books", key: "favbooks", width: 20 },
        { header: "Linkedin", key: "linkedin", width: 20 },
        { header: "About Yourself", key: "about_yourself", width: 20 },
        { header: "Advice to young people", key: "adviceToYoungPeople", width: 20 },

        // Office Hour Data
        { header: "Monday Start Time", key: "mon_start_time", width: 20 },
        { header: "Monday End Time", key: "mon_end_time", width: 20 },
        { header: "Monday Close", key: "mon_closed", width: 20 },

        { header: "Tuesday Start Time", key: "tues_start_time", width: 20 },
        { header: "Tuesday End Time", key: "tues_end_time", width: 20 },
        { header: "Tuesday Close", key: "tues_closed", width: 20 },

        { header: "Wednesday Start Time", key: "wednes_start_time", width: 20 },
        { header: "Wednesday End Time", key: "wednes_end_time", width: 20 },
        { header: "Wednesday Close", key: "wednes_closed", width: 20 },

        { header: "Thursday Start Time", key: "thurs_start_time", width: 20 },
        { header: "Thursday End Time", key: "thurs_end_time", width: 20 },
        { header: "Thursday Close", key: "thurs_closed", width: 20 },

        { header: "Friday Start Time", key: "frid_start_time", width: 20 },
        { header: "Friday End Time", key: "frid_end_time", width: 20 },
        { header: "Friday Close", key: "frid_closed", width: 20 },

        { header: "Saturday Start Time", key: "satur_start_time", width: 20 },
        { header: "Saturday End Time", key: "satur_end_time", width: 20 },
        { header: "Saturday Close", key: "satur_closed", width: 20 },

        { header: "Sunday Start Time", key: "sund_start_time", width: 20 },
        { header: "Sunday End Time", key: "sund_end_time", width: 20 },
        { header: "Sunday Close", key: "sund_closed", width: 20 },
      ];
      // Looping through User data
      let counter = 1;
      data.forEach((user) => {
        user.s_no  = counter;
        user.name  = user.mentor_profile && user.mentor_profile.profile ? user.mentor_profile.profile.fullLegalName : "";
        user.email = user.email ? user.email : "";
        user.phone = user.phone_number[0] && user.phone_number[0].extension ? user.phone_number[0].extension + "-" + user.phone_number[0].number : ""
        user.type = user.type && user.type ? user.type : "";

        user.country  = user.countryname ? user.countryname : "";
        user.state  = user.statename ? user.statename : "";
        user.city  = user.cityname ? user.cityname : "";
        user.timezone  = user.mentor_profile && user.mentor_profile.officeTimezone ? user.mentor_profile.officeTimezone.timezoneName : "";

        user.professional_title  = user.mentor_profile && user.mentor_profile.profile ? user.mentor_profile.profile.professionalTitle : "";
        user.website  = user.mentor_profile && user.mentor_profile.profile ? user.mentor_profile.profile.website : "";
        user.experience_year  = user.mentor_profile && user.mentor_profile.profile ? user.mentor_profile.profile.experience : "";
        user.last_education_institute  = user.mentor_profile && user.mentor_profile.profile ? user.mentor_profile.profile.lastEducationalInstitutionAttended : "";

        user.last_education_degree  = user.mentor_profile && user.mentor_profile.profile ? user.mentor_profile.profile.lastCollegeDegree : "";
        user.industry  = user.mentor_profile && user.mentor_profile.profile ? user.mentor_profile.profile.industry : "";
        user.your_area_of_expertise  = user.mentor_profile && user.mentor_profile.profile ? user.mentor_profile.profile.expertise[0] : "";

        user.project_interests  = user.mentor_profile && user.mentor_profile.profile ? user.mentor_profile.profile.interest.join(', ') : "";
        user.how_can_you_contribute  = user.mentor_profile && user.mentor_profile.profile ? user.mentor_profile.profile.can_help.join(', ') : "";
        user.favbooks  = user.mentor_profile && user.mentor_profile.profile ? user.mentor_profile.profile.favBooks.join(', ') : "";
        user.linkedin  = user.mentor_profile && user.mentor_profile.profile ? user.mentor_profile.profile.linkedIn : "";
        user.about_yourself  = user.mentor_profile && user.mentor_profile.profile ? user.mentor_profile.profile.aboutYou : "";
        user.adviceToYoungPeople  = user.mentor_profile && user.mentor_profile.profile ? user.mentor_profile.profile.adviceToYoungPeople : "";

        user.mon_start_time  = user.mentor_profile && user.mentor_profile.officeHours ? user.mentor_profile.officeHours[0]?.start_time : "";
        user.mon_end_time  = user.mentor_profile && user.mentor_profile.officeHours ? user.mentor_profile.officeHours[0]?.end_time : "";
        user.mon_closed  = user.mentor_profile && user.mentor_profile.officeHours ? user.mentor_profile.officeHours[0]?.closed : "";

        user.tues_start_time  = user.mentor_profile && user.mentor_profile.officeHours ? user.mentor_profile.officeHours[1]?.start_time : "";
        user.tues_end_time  = user.mentor_profile && user.mentor_profile.officeHours ? user.mentor_profile.officeHours[1]?.end_time : "";
        user.tues_closed  = user.mentor_profile && user.mentor_profile.officeHours ? user.mentor_profile.officeHours[1]?.closed : "";

        user.wednes_start_time  = user.mentor_profile && user.mentor_profile.officeHours ? user.mentor_profile.officeHours[2]?.start_time : "";
        user.wednes_end_time  = user.mentor_profile && user.mentor_profile.officeHours ? user.mentor_profile.officeHours[2]?.end_time : "";
        user.wednes_closed  = user.mentor_profile && user.mentor_profile.officeHours ? user.mentor_profile.officeHours[2]?.closed : "";

        user.thurs_start_time  = user.mentor_profile && user.mentor_profile.officeHours ? user.mentor_profile.officeHours[3]?.start_time : "";
        user.thurs_end_time  = user.mentor_profile && user.mentor_profile.officeHours ? user.mentor_profile.officeHours[3]?.end_time : "";
        user.thurs_closed  = user.mentor_profile && user.mentor_profile.officeHours ? user.mentor_profile.officeHours[3]?.closed : "";

        user.frid_start_time  = user.mentor_profile && user.mentor_profile.officeHours ? user.mentor_profile.officeHours[4]?.start_time : "";
        user.frid_end_time  = user.mentor_profile && user.mentor_profile.officeHours ? user.mentor_profile.officeHours[4]?.end_time : "";
        user.frid_closed  = user.mentor_profile && user.mentor_profile.officeHours ? user.mentor_profile.officeHours[4]?.closed : "";

        user.satur_start_time  = user.mentor_profile && user.mentor_profile.officeHours ? user.mentor_profile.officeHours[5]?.start_time : "";
        user.satur_end_time  = user.mentor_profile && user.mentor_profile.officeHours ? user.mentor_profile.officeHours[5]?.end_time : "";
        user.satur_closed  = user.mentor_profile && user.mentor_profile.officeHours ? user.mentor_profile.officeHours[5]?.closed : "";

        user.sund_start_time  = user.mentor_profile && user.mentor_profile.officeHours ? user.mentor_profile.officeHours[6]?.start_time : "";
        user.sund_end_time  = user.mentor_profile && user.mentor_profile.officeHours ? user.mentor_profile.officeHours[6]?.end_time : "";
        user.sund_closed  = user.mentor_profile && user.mentor_profile.officeHours ? user.mentor_profile.officeHours[6]?.closed : "";

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
  openModal(mode: Mode, id = null, item = null, activeStatus: Boolean) {
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Create Mentor" : "Update Mentor",
      nzContent: AddMentorsComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.onSubmitForm().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this.getMentorList(params);
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
        mentor: item,
        activeStatus: activeStatus
      },
    });
  }

  updateUserStatus(listid: any, status: any) {
    var mylist = { id: listid, status: status, userType: 'Mentor' };
    this.studentService.updateUserStatus(mylist).subscribe(
      (response) => {
        Swal.fire({
          title: 'Successful',
          text: response.message,
          icon: 'success',
        });

        this.activatedRoute.queryParams.subscribe(params => {
          this.getMentorList(params);
        });
      }
    );
  }

  getMentorsByStatus(status) {

    if (this.changed) {
      this.mentorData = [];
      this.currentPage = 1;
      this.currentLimit = 10;
      this.pageSkip = 0;
      this.mentorLoadMore = true;
    }
    let obj = {
      activationStatus: status,
      limit: this.currentLimit,
      skip: this.pageSkip,
    }

    this.isLoading = true;
    this.mentorService.getMentorsByStatus(obj).subscribe((response: any) => {
      this.isLoading = false;
      this.blogsList = response.data;

      for (let index = 0; index < this.blogsList.length; index++) {
        if (this.mentorData.length < response.results) {
          this.mentorData.push(this.blogsList[index]);
        }

      }

      if (this.mentorData.length == response.results) {
        this.mentorLoadMore = false;
      }

      this.ref.detectChanges();
    }, error => {
      this.isLoading = false;
      this.snackbar.open(error.message, null, { duration: 3000 });
    });
  }

  getMentors(status: string) {
    if (this.mentorStatus == status || this.mentorStatus == 'both') {
      this.changed = false;
    } else {
      this.changed = true;
    }
    if (status != 'both') {
      this.mentorStatus = status;
      this.getMentorsByStatus(status);
    } else {
      this.mentorStatus = 'both';
      this.getMentorList(this.paramData);
    }
  }

  _loadMore() {
    this.changed = false;
    this.currentPage++;
    this.currentLimit = 10;
    this.pageSkip = (this.currentPage - 1) * 10;
    this.getMentorsByStatus(this.mentorStatus);
  }

}
