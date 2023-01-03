import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { FeedService } from 'src/app/core/services/feed.service';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { environment } from 'src/environments/environment';
import { CollegeyAcademyComponent } from '../collegey-academy/collegey-academy.component';
import { CollegeyGroupPostComponent } from '../collegey-group-post/collegey-group-post.component';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-collegey-group-list',
  templateUrl: './collegey-group-list.component.html',
  styleUrls: ['./collegey-group-list.component.css']
})
export class CollegeyGroupListComponent implements OnInit {

  modal: NzModalRef;
  Mode = Mode;
  frontEndUrl=environment.frontEndUrl
  isLoading = false;
  isHidden = false;
  assignData = [];
  msg_success: boolean = false;
  msg_danger: boolean = false;
  throw_msg:any;
  // show_loader: boolean = false;
  totalCount:any


  //group pagination
  currentPage: number = 1;
  currentLimit: number = 10;
  totalRecord: number = 0;
  searchBygroupName: any = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private feedService: FeedService,
    private modalService: NzModalService,
    private snackbar: MatSnackBar,
    private router:Router,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    const queId=this.activatedRoute.snapshot.paramMap.get('id');
    // this.getAnswer(queId);
    this.getCollegeyGroupData(queId);
  }

  // _showSnackbar(message) {
  //   this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
  // }
  
  getCollegeyGroupData(filters:any) {
        
    var obj={
      limit: this.currentLimit,
      page:this.currentPage,
      user_id:filters,
      searchByname: this.searchBygroupName,
    }
    this.isLoading   = true;
   this. getGroupsData(obj);
  }
  groupImage:any
  getGroupsData(obj) {
    this.feedService.getGroups(obj).subscribe(
      (response) => {
          this.isLoading   = false;
        if (response.data != null && response.data != '') {
          this.assignData = response.data;
          // this.groupImage = this.imagePathS3(this.assignData?.groupIcon);
          this.totalRecord = response?.totalrecord;
          for (let f = 0; f < this.assignData.length; f++) {
            var groupTimeAgo = this.assignData[f].createdAt;
            this.assignData[f].timeago = this.timeDifference(groupTimeAgo);
            this.assignData[f].groupIcon=this.imagePathS3(this.assignData[f].groupIcon);
          }
        }
        else {
          this.currentLimit = response?.totalrecord;
        }
        this.cdr.detectChanges();
      }, error => {
          this.isLoading = false;
        });
  }

  pagination(){  
    var skip =this.currentPage*this.currentLimit
    if(skip< this.totalRecord){
      this.currentLimit=this.currentLimit+5
      this.getCollegeyGroupData(null)
    }
    else{
      this.isHidden=true
    }
  }

  timeDifference(previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var preDate = new Date(previous);
    var curDate = new Date();
    var elapsed = curDate.valueOf() - preDate.valueOf();
    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + 'm ago';
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + 'h ago';
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + 'd ago';
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + 'mth ago';
    } else {
      return Math.round(elapsed / msPerYear) + 'yrs ago';
    }
  }

  openModal(id= null) {  
    this.router.navigate(['feeds/collegey-group-post/'+id]);
  }

  imagePathS3(imageName, commonImage?){    
    return imageName ? `${environment.filesPath}${imageName}` : commonImage;
  }


}
