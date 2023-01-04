import { Component, OnInit, NgModule, Inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormArray,
  FormControl,
  FormControlName,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectService } from 'src/app/core/services/project.service';
import { MentorService } from 'src/app/core/services/mentor.service';
import {
  PartnerId,
  Project,
  CanBeDone,
  contactPerson,
  willingToConsider,
} from 'src/app/core/models/project.model';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import { ImageSource } from 'src/app/core/enums/image-upload-source.enum';
import { PipeModule } from 'src/app/shared/pipe.module';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {
  sdg = AppConstants.SDG;
  countryPhoneCode = JSON.parse(
    localStorage.getItem(AppConstants.KEY_COUNTRY_PHONE_CODE)
  );
  partnerId: PartnerId[] = JSON.parse(
    localStorage.getItem(AppConstants.KEY_PARTNER_ID)
  );
  isLoading = false;
  projectForm: FormGroup;
  project: Project;

  mentorList: any;

  documentList: any;
  imageSource = ImageSource.PROJECT;
  mode: String;
  id: any;
  loginuserId:any;
  projectImage:any;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProjectComponent>,
    private projectService: ProjectService,
    private commonService: CommonService,
    private modal: NzModalRef,
    private mentorService: MentorService,
  ) {
    this.documentList = [];
    const userObject = localStorage.getItem(AppConstants.KEY_USER_DATA);
    const userDataList = JSON.parse(userObject);
    this.loginuserId = userDataList?.user?._id;
  }

  initProjectForm() {
    this.projectForm = this.fb.group({
      title: [this.project ? this.project.title : null, Validators.required],
      description: [
        this.project ? this.project.description : null,
        Validators.required,
      ],
      impact: [this.project ? this.project.impact : null, Validators.required],
      partner: [this.project ? this.project?.partner?._id : null],
      projectOwner: [this.loginuserId],
      sdg: [this.project ? this.project.sdg : null, Validators.required],
      //skills: [this.project ? this.project.skills : null, Validators.required],
      keyword: [this.project ? this.project.keyword : null, Validators.required],
      documents: [this.project ? this.project.documents : null],
      min_students_count: [
        this.project ? this.project.min_students_count : null,
        Validators.required,
      ],
       students_count: [
        this.project ? this.project.students_count : null,
        Validators.required,
      ],
      start_date: [
        this.project ? this.project.start_date : null,
        Validators.required,
      ],
      end_date: [
        this.project ? this.project.end_date : null,
        Validators.required,
      ],
      can_be_done: this.getCanBeDone(
        this.project ? this.project.can_be_done : null
      ),
      contact_person: this.getContactPerson(
        this.project ? this.project.contact_person : null
      ),
      mentor: [this.project ? this.project.mentor?.id : null],
      willing_to_consider: this.getWillingToConsider(
        this.project ? this.project.willing_to_consider : null
      ),
      ask_questions: [
        this.project ? this.project.ask_questions : null,
        Validators.required,
      ],
      projectfees: [this.project ? this.project.projectfees : '1',Validators.required],
      questions: this.createQuestionsFormArray(
        this.project ? this.project.questions : []
      ),
    });

    if (this.project?.documents && this.project.documents.length > 0) {
        this.project.documents.forEach((image) => {
          this.documentList.push(image);
        });
    }
  }

  get questions() {
    return this.projectForm.get('questions') as FormArray;
  }

  onAddQuestions() {
    this.questions.push(this.fb.control(''));
  }

  onRemoveQuestions(index) {
    this.questions.removeAt(index);
  }

  createQuestionsFormArray(questions): FormArray {
    return this.fb.array(
      questions.length > 0
        ? questions.map((question) => this.fb.control(question))
        : [new FormControl('')]
    );
  }

  getCanBeDone(canBeDone: CanBeDone) {
    return this.fb.group({
      onsite: [canBeDone ? canBeDone.onsite : null],
      othersite: [canBeDone ? canBeDone.othersite : null],
      remotely: [canBeDone ? canBeDone.remotely : null],
    });
  }

  getContactPerson(contactPerson: contactPerson) {
    return this.fb.group({
      name: [contactPerson ? contactPerson.name : null],
      email: [contactPerson ? contactPerson.email : null],
      linkedin_url: [contactPerson ? contactPerson.linkedin_url : null],
      phone_number: this.fb.group({
        extension: [contactPerson?.phone_number?.extension],
        number: [
          contactPerson?.phone_number?.number,
          [Validators.pattern(AppConstants.PHONE_PATTERN)],
        ],
        tag: [contactPerson?.phone_number?.tag],
      }),
    });
  }

  getWillingToConsider(willingToConsider: willingToConsider) {
    return this.fb.group({
      answer: [willingToConsider ? willingToConsider.answer : null],
      comments: [willingToConsider ? willingToConsider.comments : null],
    });
  }

  onFileUpload(list) {
    this.projectImage = this.commonService.imagePathS3(list[0]);
    this.projectForm.patchValue({
      documents: list,
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  onSubmitForm() {
    return new Promise<void>((resolve, reject) => {
      this.projectForm.markAllAsTouched();
      if (this.projectForm.invalid) {
        return;
      }
      const formData = this.projectForm.getRawValue();
      this.isLoading = true;
      
      // const skills = [];
      // formData.skills.forEach((skill) => {
      //   if (skill.label) {
      //     skills.push(skill.label);
      //   } else {
      //     skills.push(skill);
      //   }
      // });
      // formData.skills = skills;
      
      const keyword = [];
      formData.keyword.forEach((hash_tag) => {
        if (hash_tag.label) {
          keyword.push(hash_tag.label);
        } else {
          keyword.push(hash_tag);
        }
      });
      formData.keyword = keyword;
      formData.status = 1;

      formData['projectStatus'] = 'pending';
      formData['projectType'] = 'collegey';
      formData['image'] = this.projectImage;
      formData['remainingSlot'] = formData?.students_count;
      
      !this.project ? this.addProject(formData).then((response)=>{
        resolve()
      }).catch((e)=>{
        reject();
      }) : this.updateProject(formData).then((response)=>{
        resolve()
      }).catch((e)=>{
        reject();
      });
    })
    
  }

  addProject(formObj) {
    return new Promise((resolve, reject) => {
      this.projectService.createProject(formObj).subscribe(
        (response) => {
          this.isLoading = false;
          Swal.fire({
            title: 'Successful',
            text: 'Project created succesfully',
            icon: 'success',
          });
          // this.dialogRef.close(response);
          resolve(response)
        },
        (error) => {
          this.isLoading = false;
          Swal.fire(
            'Failed to create project',
            error.message || error.error,
            'error'
          );
          reject(error)
        }
      );
    })    
  }

  updateProject(obj) {
    return new Promise((resolve, reject) => {
      this.projectService.updateProject(obj, this.project._id).subscribe(
        (response) => {
          this.isLoading = false;
          Swal.fire({
            title: 'Successful',
            text: 'Project updated succesfully',
            icon: 'success',
          }).then(() => {
            // this.dialogRef.close(response);
            resolve(response)
          });
        },
        (error) => {
          this.isLoading = false;
          Swal.fire(
            'Failed to update project',
            error.message || error.error,
            'error'
          );
          reject(error)
        }
      );
    })
    
  }

  getMentors() {
    this.mentorService
      .getMentors()
      .subscribe((data) =>
        this.mentorList = data
      );
   }

  ngOnInit(): void {
    this.initProjectForm();
    this.projectImage = this.project?.image; 
    this.projectService
      .getPartnerId()
      .subscribe((data) => {  
        console.log("data===>", data);        
        this.projectService.savePartnerId(data)
      }
      )

    this.getMentors();
      
    this.projectForm.get('ask_questions').valueChanges.subscribe((value) => {
      if (value) {
        this.projectForm.setControl('questions', this.fb.array(['']));
      }
    });
  }
  cancel() {
    this.modal.destroy();
  }
}
