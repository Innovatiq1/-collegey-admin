import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { NzModalRef } from 'ng-zorro-antd';
import referralCodeGenerator from 'referral-code-generator';
import Swal from 'sweetalert2';

// Load Services
import { MentorService } from 'src/app/core/services/mentor/mentor.service';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-mentor-resources',
  templateUrl: './mentor-resources.component.html',
  styleUrls: ['./mentor-resources.component.css']
})
export class MentorResourcesComponent implements OnInit {

  resourceForm: FormGroup;
  mode: String;
  id: any; 
  resource : any;

  wordCount: any;
  words: any;
  showWordLimitError: Boolean = false;
  constructor(
    private fb: FormBuilder,
    private mentorService: MentorService,
    private modal: NzModalRef,
  ){ } 

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.createForm();
    if (this.mode === Mode.Edit) {
      this.fetchResource();
    } else {
      this.resourceForm.patchValue({
        link: 'https://www.youtube.com/embed/',
      });
    }
  }

  fetchResource() {
    let obj = {id:this.id}
    this.mentorService.getMentorResourceInfo(obj).subscribe(
      (response) => {
        if (response) {
          this.patchForm(response);
        }
      },
      (err) => {
      },
      () => {
      }
    );
  }

  patchForm(resource) {
    this.resource = resource;
    this.resourceForm.patchValue({
      title: resource?.data?.title,
      description: resource?.data?.description,
      link: resource?.data?.link,
    });
    this.markAllTouched();
  }

  createForm() {
    this.resourceForm = this.fb.group(
      {
        title: ["", [Validators.required]],
        description: ["", [Validators.required, Validators.pattern(/^(?!\s*$).+/)]],
        link: ["", [Validators.required]],
      },
    );
    // this.coursesFromArray.push(this.fb.group([]));
    this.resourceForm.valueChanges.subscribe(() => {
      
    });
  }

  wordCounter(event) {
    if (event.keyCode != 32) {
      this.wordCount = event.target.value ? event.target.value.split(/\s+/) : 0;
      this.words = this.wordCount ? this.wordCount.length : 0;
    }

    if (this.words > 10) {
      this.showWordLimitError = true;
    } else {
      this.showWordLimitError = false;
    }
  }

  save() {
    return new Promise<void>((resolve, reject) => {
      this.markAllTouched();
      if (this.resourceForm.valid && this.showWordLimitError == false) {
        if (this.mode === Mode.Create) {
          this.mentorService.createMentorResources(this.resourceForm.value).subscribe(
            (res) => {
              this.id = res._id;
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
                'Add Resource faild',
                'error'
              );
            },
            () => {
              reject();
            }
          );
        } else {
          console.log(this.resourceForm.value);
          this.mentorService.updateMentorResource(this.resourceForm.value, this.id).subscribe(
            (res) => {
              Swal.fire({
                title: 'Successful',
                text: 'Update Resource Succesfully',
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
    for (const i in this.resourceForm.controls) {
      this.resourceForm.controls[i].markAsDirty();
      this.resourceForm.controls[i].updateValueAndValidity();
    }
  }

}
