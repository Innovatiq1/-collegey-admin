import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { FeedService } from 'src/app/core/services/feed.service';
import Swal from 'sweetalert2';
enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-collegey-question',
  templateUrl: './collegey-question.component.html',
  styleUrls: ['./collegey-question.component.css']
})
export class CollegeyQuestionComponent implements OnInit {

  mode: String;
  id: any;
  itemData: any; 
  pageContent : any;
  QuestionForm:FormGroup;

  constructor(
    private fb: FormBuilder,
    private feedService: FeedService,
    private modal: NzModalRef,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.createForm();
    if (this.mode === Mode.Edit)
    {
      this.fetchUpdated();
    }
    else 
    {
      
    }
  }

  createForm() {
    this.QuestionForm = this.fb.group(
      {
        question: [null, Validators.required],
        responseLable: [null],
        question_content: ["", [Validators.required]],
        status: [null, Validators.required],
      },
    );
    this.QuestionForm.valueChanges.subscribe(() => {
    });
  }


  fetchUpdated() {
    this.patchForm(this.itemData);
  }

  patchForm(pageContent) {    
    this.pageContent = pageContent;
    this.QuestionForm.patchValue({
      question: pageContent?.question,
      question_content: pageContent?.question_content,
      status: pageContent?.status,
      responseLable: pageContent?.responseLable,
    });
    this.markAllTouched();
  }

  save() {
    return new Promise<void>((resolve, reject) => {
      this.markAllTouched();
      if (this.QuestionForm.valid) {
        if (this.mode === Mode.Create) {
          let obj = this.QuestionForm.value;
          this.feedService.createQuestionData(obj).subscribe(
            (res) => {
              this.modal.destroy();
              resolve();
              Swal.fire({
                title: 'Successful',
                text: res.message,
                icon: 'success',
              });
            },
            (err) => {
              debugger;
              reject();
              Swal.fire( 
                'Add data faild',
                'error'
              );
            },
            () => {
              reject(); 
            }
          );
        } else {
          let obj = this.QuestionForm.value;
          
          this.feedService.updateQuestionData(obj,this.id).subscribe(
            (res) => {
              Swal.fire({
                title: 'Successful',
                text: 'Update data Succesfully',
                icon: 'success',
              });
              resolve();
            },
            (err) => {
              Swal.fire(
                'Failed to Update',
                'error'
              );
              reject();
            },
            () => {
              reject();
            }
          );
        }
      }
    });
  }

  cancel() {
    this.modal.destroy();
  }

  markAllTouched() {
    for (const i in this.QuestionForm.controls) {
      this.QuestionForm.controls[i].markAsDirty();
      this.QuestionForm.controls[i].updateValueAndValidity();
    }
  }

}
