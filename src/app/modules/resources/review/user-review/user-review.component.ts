import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { Review } from 'src/app/core/models/review.model';
import { ReviewService } from 'src/app/core/services/review.service';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { AddUserReviewComponent } from './add-user-review/add-user-review.component';
import Swal from 'sweetalert2';


enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css']
})
export class UserReviewComponent implements OnInit {

  isLoading = false;
  userReviewList: Review[] = [];
  searchText: string = "";
  modal: NzModalRef;
  Mode = Mode;
  @ViewChild("searchBox") searchBox: ElementRef;
  @ViewChild("fileImportInput") fileImportInput: any;
  keyup$: Observable<any>;

  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private reviewService: ReviewService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getReviewList(params);
    });
  }
  getReviewList(filter) {
    this.isLoading = true;
    this.reviewService.getReviewList(filter).subscribe( response =>{
      console.log("Faqservice",response)
      this.userReviewList = response.data.data.filter(review=>{
        return review.reviewType == 'user';
      });
      if(response.results - (+filter.limit) < -11) {
        this._showSnackbar("No more data found")
      }
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.snackbar.open(error.message, null , {duration: 3000});
    });
  }

  _showSnackbar(message) {
    this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
  }

  openModal(mode: Mode, id = null, item = null) {
    // console.log("Clicked")
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Create Review" : "Update Review",
      nzContent: AddUserReviewComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.onSubmitForm().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this.getReviewList(params);
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
        review:item
      },
    });
  }

  activationTestimonial(listid:any,status:any)
  {
      var mylist = {id:listid,status:status};
      this.reviewService.updateReviewTestimonialStatus(mylist).subscribe(
        (response) => {
          Swal.fire({
            title: 'Successful',
            text: response.message,
            icon: 'success',
          });
          this.activatedRoute.queryParams.subscribe(params => {
            this.getReviewList(params);
          });
        },
        (err) => {
          Swal.fire( 
            'Add file faild',
            'error'
          );
        },
      );
  }


}
