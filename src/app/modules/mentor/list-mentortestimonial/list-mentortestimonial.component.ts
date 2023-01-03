import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { fromEvent, Observable } from 'rxjs';
import referralCodeGenerator from 'referral-code-generator'
import { Papa } from 'ngx-papaparse';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConstants } from 'src/app/shared/constants/app.constants';

// Load Services
import { MentorService } from 'src/app/core/services/mentor/mentor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-mentortestimonial',
  templateUrl: './list-mentortestimonial.component.html',
  styleUrls: ['./list-mentortestimonial.component.css']
})
export class ListMentortestimonialComponent implements OnInit {

  resourceData = [];
  isLoading = false;
  modal: NzModalRef;
  resource_formData: any;

  msg_success: boolean = false;
  msg_danger: boolean = false;
  throw_msg: any;

  show_loader: boolean = false;

  constructor(
    private mentorService: MentorService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private papa: Papa,
    private snackbar: MatSnackBar,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getMentorTestimonialList(params);
    });
  }

  getMentorTestimonialList(filters) {
    this.isLoading = true;
    this.show_loader = true;
    this.mentorService.getMentorTestimonialList(filters).subscribe(response => {
      this.resource_formData = response?.data;
      this.show_loader = false;
      this.isLoading = false;
      this.resourceData = response?.data;
      let limit = filters.limit ? filters.limit : 10
      if (response.totalDocs <= limit || response.totalDocs <= 0) {
        this._showSnackbar("No more data found")
        this.isLoading = true;
      }
      this.ref.detectChanges();

    }, error => {
      this.isLoading = false;
    });
  }

  _showSnackbar(message) {
    this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
  }

  activationTestimonial(listid: any, status: any) {
    var mylist = { id: listid, status: status };
    this.mentorService.updatetestimonialStatus(mylist).subscribe(
      (response) => {
        Swal.fire({
          title: 'Successful',
          text: response.message,
          icon: 'success',
        });
        this.activatedRoute.queryParams.subscribe(params => {
          this.getMentorTestimonialList(params);
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
