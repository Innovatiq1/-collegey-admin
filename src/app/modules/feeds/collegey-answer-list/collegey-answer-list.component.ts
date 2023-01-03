import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { FeedService } from 'src/app/core/services/feed.service';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-collegey-answer-list',
  templateUrl: './collegey-answer-list.component.html',
  styleUrls: ['./collegey-answer-list.component.css']
})
export class CollegeyAnswerListComponent implements OnInit {

  isLoading = false;
  assignData = [];
  title:any;
  userProfile:any;
  msg_success: boolean = false;
  msg_danger: boolean = false;
  throw_msg:any;
  show_loader: boolean = false;
  frontEndUrl=environment.frontEndUrl
  totalCount:any
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private feedService: FeedService,
    private modalService: NzModalService,
    private snackbar: MatSnackBar,
    private ref: ChangeDetectorRef,
    private router:Router
  ) { }

  ngOnInit(): void {
    const queId=this.activatedRoute.snapshot.paramMap.get('id');
    // this.getAnswer(queId);
  this.getCollegeyAnswerData(queId);
  }

  _showSnackbar(message) {
    this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
  }

  getCollegeyAnswerData(filters:any) {
    var obj={
      id:filters
    }
    this.isLoading   = true;
    this.show_loader = true;
    this.feedService.getAnswerData(obj).subscribe( response =>{
      this.show_loader = false;
      this.isLoading   = false; 
      this.assignData  = response?.data;
      this.title  = response?.data[0]?.Question;
      this.userProfile  =this.frontEndUrl+'profile/' + response?.data[0]?.UserId + '/' + response?.data[0]?.name;
      this.totalCount=this.assignData.length;   
      this.ref.detectChanges();
      if(response?.data?.totalDocs - (+filters.limit) < -11) {
        this._showSnackbar("No more data found")
      }
    }, error => {
      this.isLoading = false;
    }); 
  }
//var currentUrl = this.siteurl + 'profile/' + this.userid + '/' + this.userComboname;

}
