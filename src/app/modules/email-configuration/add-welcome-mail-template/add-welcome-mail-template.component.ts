import { Component, OnInit, NgModule, Inject, EventEmitter } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { NzModalRef } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';

// Load Services
import { EmailConfigurationService } from 'src/app/core/services/email-configuration/email-configuration.service';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-add-welcome-mail-template',
  templateUrl: './add-welcome-mail-template.component.html',
  styleUrls: ['./add-welcome-mail-template.component.css']
})
export class AddWelcomeMailTemplateComponent implements OnInit {

  emailTemplateForm: FormGroup;
  mode: String;
  id: any;
  itemData: any; 
  pageContent : any;

  constructor(
    private fb: FormBuilder,
    private emailConfigurationService: EmailConfigurationService,
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
  
  fetchUpdated() {
    this.patchForm(this.itemData);
  }

  patchForm(pageContent) {
    this.pageContent = pageContent;
    this.emailTemplateForm.patchValue({
      email_template_type: pageContent?.email_template_type,
      email_subject: pageContent?.email_subject,
      email_top_welcome_text: pageContent?.email_top_welcome_text,
     
      email_content1: pageContent?.email_content1,
      email_content2: pageContent?.email_content2,

      email_content3_title: pageContent?.email_content3_title,
      email_content3: pageContent?.email_content3,
      email_content4_title: pageContent?.email_content4_title,
      email_content4: pageContent?.email_content4,
      email_content5_title: pageContent?.email_content5_title,
      email_content5: pageContent?.email_content5,
      bottom_line_text: pageContent?.bottom_line_text,
      bottom_button_text: pageContent?.bottom_button_text,
    });
    this.markAllTouched();
  }

  createForm() {
    this.emailTemplateForm = this.fb.group(
      {
        email_template_type: ["welcome_mail_template", [Validators.required]],
        email_subject: ["", [Validators.required]],
        email_top_welcome_text: ["", [Validators.required]],
        email_content1: ["", [Validators.required]],
        email_content2: ["", [Validators.required]],
        email_content3_title: ["", [Validators.required]],
        email_content3: ["", [Validators.required]],
        email_content4_title: ["", [Validators.required]],
        email_content4: ["", [Validators.required]],
        email_content5_title: ["", [Validators.required]],
        email_content5: ["", [Validators.required]],
        bottom_line_text: ["", [Validators.required]],
        bottom_button_text: ["", [Validators.required]],
      },
    );
    this.emailTemplateForm.valueChanges.subscribe(() => {
    });
  }

  save() {
    return new Promise<void>((resolve, reject) => {
      this.markAllTouched();
      if (this.emailTemplateForm.valid) {
        if (this.mode === Mode.Create) {
          let obj = this.emailTemplateForm.value;
          obj['insertaction'] = 'welcome_mail_template';
          this.emailConfigurationService.addForgetPasswordTemplate(obj).subscribe(
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
          let obj = this.emailTemplateForm.value;
          obj['insertaction'] = 'welcome_mail_template';
          this.emailConfigurationService.updateForgetPasswordTemplate(obj,this.id).subscribe(
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
    for (const i in this.emailTemplateForm.controls) {
      this.emailTemplateForm.controls[i].markAsDirty();
      this.emailTemplateForm.controls[i].updateValueAndValidity();
    }
  }

}
