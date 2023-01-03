import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NzModalRef } from 'ng-zorro-antd';
import { FAQ } from 'src/app/core/models/faq.model';
import { Category } from 'src/app/core/models/faq.model';
import { FaqService } from 'src/app/core/services/faq.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import Swal from 'sweetalert2';
import { AddTeamComponent } from '../../team/add-team/add-team.component';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.css']
})
export class AddFaqComponent implements OnInit {

  submitted:boolean=false
  isLoading = false;
  faqForm: FormGroup;
  faq: FAQ;
  category: Category;
  documentList = [];
  mode: String;
  id: any;

  categoryPositions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private faqService: FaqService,
    private utilService: UtilsService,
    public dialogRef: MatDialogRef<AddTeamComponent>,
    private modal: NzModalRef,
    private cdr: ChangeDetectorRef,
  ) {
  }

  initFaqForm() {
    this.faqForm = this.fb.group({
      ques: [this.faq ? this.faq.ques : null, Validators.required],
      answer: [
        this.faq ? this.faq.answer : null,
        Validators.required,
      ],
      category: [
        this.faq ? this.faq?.category['_id'] : null,
        Validators.required,
      ],
      // position: [this.faq ? this.faq.position : null,
      //   Validators.required],
     
    });
  }

  onSubmitForm() {
    this.submitted=true;
    return new Promise<void>((resolve, reject) => {
      this.faqForm.markAllAsTouched();
      if (this.faqForm.invalid) {
        return;
      }
      let formData = this.faqForm.getRawValue();
      this.isLoading = true;
      if (!this.faq) {
        this.saveFaq(formData).then((response)=>{
          resolve()
        }).catch((e)=>{
          reject();
        });
      } else {
        this.updateFaq(formData).then((response)=>{
          resolve()
        }).catch((e)=>{
          reject();
        });
      }
    })
    
  }

  updateFaq(formData) {
    return new Promise((resolve, reject) => {
      this.faqService.updateFaqs(formData, this.faq._id).subscribe(
        (faq) => {
          Swal.fire('Successful', 'Faq updated successfully', 'success');
          this.isLoading = false;
          // this.dialogRef.close(conference);
          resolve(faq)
        },
        (err) => {
          this.isLoading = false;
          Swal.fire(
            'Failed to update conference',
            err.message || err.error,
            'error'
          );
          reject(err)
        }
      );
    })
    
  }
  saveFaq(formData) {
    return new Promise((resolve, reject) => {
      this.faqService.createFaqs(formData).subscribe(
        (faq) => {
          Swal.fire('Successful', 'Faq added succesfully', 'success');
          this.isLoading = false;
          // this.dialogRef.close(conference);
          resolve(faq)
        },
        (err) => {
          this.isLoading = false;
          Swal.fire('Failed to add faq', err.message || err.error, 'error');
          reject(err)
        }
      );
    })
  }

  getCategories() {
    this.isLoading = true;
    this.faqService.getCategoryList().subscribe( response =>{
      this.isLoading = false;

      this.categoryPositions = response.data;
      console.log("this.categoryPositions==>", this.categoryPositions);
      
      
      this.cdr.detectChanges();
    }, error => {
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.initFaqForm();
    this.getCategories();
  }
  cancel() {
    this.modal.destroy();
  }
}
