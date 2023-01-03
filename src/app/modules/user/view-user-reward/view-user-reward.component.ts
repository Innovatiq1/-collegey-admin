import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-view-user-reward',
  templateUrl: './view-user-reward.component.html',
  styleUrls: ['./view-user-reward.component.css']
})
export class ViewUserRewardComponent implements OnInit {
  isLoading = false;
  rewardList: any = [];
  userId:any;
  constructor(
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
  )
  { 
    this.userId = this.activatedRoute.snapshot?.params?.id;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getUserRewards(params);
    });
  }

  getUserRewards(filters) { 
    this.isLoading   = true;
    this.userService.getUserRewards(filters,this.userId).subscribe( response =>{
      this.isLoading   = false; 
      this.rewardList  = response?.data?.docs;
      this.cdr.detectChanges();
      if (response.data.totalDocs <= response.data.limit || this.rewardList.length<=0) {
        this._showSnackbar("No more data found");
        this.isLoading = true;
      }
    }, error => {
      this.isLoading = false;
    }); 
  }

  
  _showSnackbar(message) {
    this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
  }


}
