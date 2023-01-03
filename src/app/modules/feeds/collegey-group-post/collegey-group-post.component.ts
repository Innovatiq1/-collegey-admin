import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd';
import { FeedService } from 'src/app/core/services/feed.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-collegey-group-post',
  templateUrl: './collegey-group-post.component.html',
  styleUrls: ['./collegey-group-post.component.css']
})
export class CollegeyGroupPostComponent implements OnInit {

  responseGroup: any;
  noFeedData: Boolean = false;
  groupLoadMoreStatus: boolean = true;
  groupTitle:any
  gId:any
  isLoading = false;

   //pagination
   currentPage: number = 1;
   currentLimit: number = 5;
   totalRecord: number = 0;
   searchBygroupName: any = '';
   isHidden:boolean = false
  
  constructor(
    private feedService: FeedService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    const grnId=this.activatedRoute.snapshot.paramMap.get('id');
    this.gId=grnId
    this.getGroupPost(grnId)
  }

  getGroupPost(id:any){
   
    
    let obj = {
      docLimit: this.currentLimit,
      feedPage: this.currentPage,
      skipFeed:0,
      groupId: id,
    }

    this.isLoading   = true;
    this.feedService.getGroupFeedById(obj).subscribe((res) => {

      this.responseGroup = res.data.data; 
      this.groupTitle=res.data.data[0]?.group?.groupName;
      this.totalRecord=res.results; 
      this.isLoading   = false;     

      for (let j = 0; j < this.responseGroup.length; j++) {
        var postCreateAgo = this.responseGroup[j].createdAt;
        this.responseGroup[j].timeago = this.timeDifference(postCreateAgo);

        for (let k = 0; k < this.responseGroup[j].comment?.length; k++) {
          var postCommentAgo = this.responseGroup[j].comment[k].createdAt;
          this.responseGroup[j].comment[k].timeagoComment = this.timeDifference(postCommentAgo);
        }
      }

      if (this.responseGroup.length > 0) {
        this.noFeedData = false;
      } else {
        this.noFeedData = true;
      }

      if (this.responseGroup.length == res.results || res.results == undefined) {
        this.groupLoadMoreStatus = false;
      } else {
        this.groupLoadMoreStatus = true;
      }
      this.cdr.detectChanges();
    });
  }

  
  pagination(){      
    var skip =this.currentPage*this.currentLimit
    if(skip< this.totalRecord){
      this.currentLimit += 5
      this.getGroupPost(this.gId)
      this.cdr.detectChanges();
    }
    else{
      this.isHidden=true
    }
  }

  timeDifference(previous) {
    // console.log('test')
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
  
  imagePathS3(imageName, commonImage?){ 
    return imageName ? `${environment.filesPath}${imageName}` : commonImage;
  }

}
