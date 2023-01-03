import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NzModalRef } from 'ng-zorro-antd';
import { FaqCategory } from 'src/app/core/models/faq-category.model';
import { Category } from 'src/app/core/models/faq.model';
import { FaqService } from 'src/app/core/services/faq.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import Swal from 'sweetalert2';
import { AddTeamComponent } from '../../team/add-team/add-team.component';

@Component({
  selector: 'app-faq-category',
  templateUrl: './faq-category.component.html',
  styleUrls: ['./faq-category.component.css']
})
export class FaqCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  category: Category[];
  isLoading = false;
  categoryLength: any;
  mode: String;
  id: any;
  submitted:boolean=false;

  categoryPositionArray: any[] = [];

  constructor(
    private fb: FormBuilder,
    private faqService: FaqService,
    private utilService: UtilsService,
    public dialogRef: MatDialogRef<AddTeamComponent>,
    private modal: NzModalRef,
    private cdr: ChangeDetectorRef,

  ) { }

  initcategoryForm() {   
    console.log("category===>", this.category);
    
    this.categoryForm = this.fb.group({
      category: [
        this.category ? this.category['name'] : null,
        Validators.required,
      ],
      position: [
        this.category ? this.category['position'] : null,
        Validators.required
      ],
     
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.initcategoryForm();
    
  }

  
  onSubmitForm() {
    this.submitted=true;
    return new Promise<void>((resolve, reject) => {
      this.categoryForm.markAllAsTouched();
      if (this.categoryForm.invalid) {
        return;
      }
      let formData = this.categoryForm.getRawValue();
      this.isLoading = true;
      if (!this.category) {
        this.saveCategory(formData).then((response)=>{
          console.log('response===>', response);
          this.category = response['data'];
          resolve()
        }).catch((e)=>{
          reject();
        });
      } else {
        formData['id'] = this.id;
        this.updateCategory(formData).then((response)=>{
          console.log('response===>', response);
          this.category = response['data'];
          resolve()
        }).catch((e)=>{
          reject();
        });
      }




      this.getCategories();
      window.location.reload();
      this.cdr.detectChanges();
      // this.saveCategory(formData);
    
    })    
  }

  updateCategory(formData) {
    return new Promise((resolve, reject) => {
      this.faqService.updateCategory(formData).subscribe(
        (faq) => {
          Swal.fire('Successful', 'Category updated successfully', 'success');
          this.isLoading = false;
          // this.dialogRef.close(conference);
          resolve(faq)
        },
        (err) => {
          this.isLoading = false;
          Swal.fire(
            'Failed to update category',
            err.message || err.error,
            'error'
          );
          reject(err)
        }
      );
    })
    
  }

  getCategories() {
    this.isLoading = true;
    this.faqService.getCategoryList().subscribe( response =>{
      this.isLoading = false;
      this.categoryLength = response.data.length;   
      for (let index = 1; index < response.data.length + 2; index++) {
        this.categoryPositionArray.push(index);
      }    
      this.cdr.detectChanges();
    }, error => {
      this.isLoading = false;
    });
  }

  saveCategory(formData) {
    return new Promise((resolve, reject) => {
      this.faqService.createCategory(formData).subscribe(
        (faq) => {
          Swal.fire('Successful', 'Faq category added succesfully', 'success');
          this.isLoading = false;
          // this.dialogRef.close(conference);
          resolve(faq)
        },
        (err) => {
          this.isLoading = false;
          Swal.fire('Failed to add faq category', err.message || err.error, 'error');
          reject(err)
        }
      );
    })
  }

  cancel() {
    this.modal.destroy();
  }

}
