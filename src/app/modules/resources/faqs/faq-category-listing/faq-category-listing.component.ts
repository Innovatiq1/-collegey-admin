import { Component, ElementRef, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { Category, FAQ } from 'src/app/core/models/faq.model';
import { FaqService } from 'src/app/core/services/faq.service';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { AddFaqComponent } from '../add-faq/add-faq.component';
import { FaqCategoryComponent } from '../faq-category/faq-category.component';
import { FormGroup } from '@angular/forms';
import { FaqCategory } from 'src/app/core/models/faq-category.model';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-faq-category-listing',
  templateUrl: './faq-category-listing.component.html',
  styleUrls: ['./faq-category-listing.component.css']
})
export class FaqCategoryListingComponent implements OnInit {

  isLoading = false;
  categorylist: Category[] = [];
  searchText: string = "";
  modal: NzModalRef;
  modal1: NzModalRef;
  Mode = Mode;
  @ViewChild("searchBox") searchBox: ElementRef;
  @ViewChild("fileImportInput") fileImportInput: any;
  keyup$: Observable<any>;

  categoryForm: FormGroup;
  category: FaqCategory;
  categoryLength: any;
  mode: String;

  categoryPositionArray: any[] = [];
  
  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private faqService: FaqService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.isLoading = true;
    this.faqService.getCategoryList().subscribe( response =>{
      this.isLoading = false;
      this.categorylist = response.data;
      console.log("this.categorylist==>", this.categorylist);
      
      this.categoryLength = response.data.length;   
      console.log("this.categoryLength===>", this.categoryLength);
      for (let index = 1; index < response.data.length + 2; index++) {
        this.categoryPositionArray.push(index);
      }
      console.log('this.categoryPositionArray===>', this.categoryPositionArray);
      
      this.cdr.detectChanges();
    }, error => {
      this.isLoading = false;
    });
  }

  openCategoryModal(mode: Mode, id = null, item = null) {
    this.modal1 = this.modalService.create({
      nzTitle: mode === "Create" ? "Create faq category" : "Update faq category",
      nzContent: FaqCategoryComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.onSubmitForm().then(() => {
              componentInstance!.cancel();
              // this.activatedRoute.queryParams.subscribe(params => {
              //   this.getFaqList(params);
              // });
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
        category:item
      },
    });
  }

}
