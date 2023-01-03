import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FeedService } from 'src/app/core/services/feed.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewFeedComponent } from '../view-feed/view-feed.component';
import { EditFeedComponent } from '../edit-feed/edit-feed.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConstants } from 'src/app/shared/constants/app.constants';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit {
  isLoading = false;
  feedData: any[] = [];
  modal: NzModalRef;
  id:any

  constructor(
    private feedService: FeedService,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getFeedList(params);
    });
  }

  getFeedList(filter) {
    this.feedService.getFeedList(filter).subscribe((res) => {
      this.isLoading = false;
      this.feedData = res.data;
      let limit = filter.limit ? filter.limit : 10
      if (res.totalRecords <= limit || res.totalRecords <= 0) {
        this._showSnackbar("No more data found")
        this.isLoading = true;
      }
      this.cdr.detectChanges();
    })
  }

  _showSnackbar(message) {
    this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
  }

  deleteFeed(feedId, status) {
    let obj = {
      feedId: feedId,
      activationStatus: status
    }
    this.feedService.deleteFeed(obj).subscribe((res) => {
      this.activatedRoute.queryParamMap.subscribe(params => {
        this.getFeedList(params);
      });
      this.cdr.detectChanges();
    });
  }

  viewFeed(questionId, feed) {
    this.modal = this.modalService.create({
      nzTitle: 'Collegey Feed',
      nzContent: ViewFeedComponent,
      nzFooter: [
        {
          label: "close",
          type: "default",
          onClick: (componentInstance) => {
            componentInstance!.cancel();
          },
        },
      ],
      nzMaskClosable: false,
      nzWidth: 900,
      nzComponentParams: {
        feedData: feed
      },
    });
  }
  editFeed(questionId, feed) {
    this.modal = this.modalService.create({
      nzTitle: 'Collegey Feed',
      nzContent: EditFeedComponent,
      nzFooter: [
        {
          label: "Update",
          show: feed ? (feed.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.save().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParamMap.subscribe(params => {
                this.getFeedList(params);
              });
            });
          },
        },
        {
          label: "close",
          type: "default",
          onClick: (componentInstance) => {
            componentInstance!.cancel();
          },
        },
        
      ],
      nzMaskClosable: false,
      nzWidth: 900,
      nzComponentParams: {
       // id: questionId,
        feedData: feed
      },
    });
  }

}
