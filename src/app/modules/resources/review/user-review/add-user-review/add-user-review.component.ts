import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NzModalRef } from 'ng-zorro-antd';
import { Review } from 'src/app/core/models/review.model';
import { FaqService } from 'src/app/core/services/faq.service';
import { ReviewService } from 'src/app/core/services/review.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import Swal from 'sweetalert2';
import { AddTeamComponent } from '../../../team/add-team/add-team.component';

@Component({
  selector: 'app-add-user-review',
  templateUrl: './add-user-review.component.html',
  styleUrls: ['./add-user-review.component.css']
})
export class AddUserReviewComponent implements OnInit {
  isLoading = false;
  reviewForm: FormGroup;
  review: Review;
  documentList = [];
  mode: String;
  id: any;

  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService,
    private utilService: UtilsService,
    public dialogRef: MatDialogRef<AddTeamComponent>,
    private modal: NzModalRef,
  ) {
  }

  initReviewForm() {
    this.reviewForm = this.fb.group({
      reviewType: ['user', Validators.required],
      name: [this.review ? this.review.name : null, Validators.required],
      qualification: [
        this.review ? this.review.qualification : null,
        Validators.required,
      ],
      country: [
        this.review ? this.review.country : null,
        Validators.required,
      ],
      position: [this.review ? this.review.position : null,
        Validators.required],
      url: [this.review ? this.review.url : null,
          CustomValidators.urlValidator],
      text: [this.review ? this.review.text : null,
            Validators.required],
     
    });
  }

  onSubmitForm() {
    return new Promise<void>((resolve, reject) => {
      this.reviewForm.markAllAsTouched();
      if (this.reviewForm.invalid) {
        return;
      }
      let formData = this.reviewForm.getRawValue();
      this.isLoading = true;
      if (!this.review) {
        this.saveReview(formData).then((response)=>{
          resolve()
        }).catch((e)=>{
          reject();
        });
      } else {
        this.updateReview(formData).then((response)=>{
          resolve()
        }).catch((e)=>{
          reject();
        });
      }
    })
    
  }

  updateReview(formData) {
    let formData1 = this.reviewForm.getRawValue();
    formData1['user_id'] = '1';
    console.log("FormData1 : ", formData1);    
    return new Promise((resolve, reject) => {
      this.reviewService.updateReview(formData, this.review._id).subscribe(
        (review) => {
          Swal.fire('Successful', 'Review updated successfully', 'success');
          this.isLoading = false;
          // this.dialogRef.close(conference);
          resolve(review)
        },
        (err) => {
          this.isLoading = false;
          Swal.fire(
            'Failed to update Review',
            err.message || err.error,
            'error'
          );
          reject(err)
        }
      );
    })
    
  }
  saveReview(formData) {
    return new Promise((resolve, reject) => {
      this.reviewService.createReview(formData).subscribe(
        (review) => {
          Swal.fire('Successful', 'Review added succesfully', 'success');
          this.isLoading = false;
          // this.dialogRef.close(conference);
          resolve(review)
        },
        (err) => {
          this.isLoading = false;
          Swal.fire('Failed to add Review', err.message || err.error, 'error');
          reject(err)
        }
      );
    })
  }

  ngOnInit(): void {
    this.initReviewForm();
  }
  cancel() {
    this.modal.destroy();
  }
}
