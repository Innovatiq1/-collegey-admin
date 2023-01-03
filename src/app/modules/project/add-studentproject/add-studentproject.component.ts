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
import {
  PartnerId,
  Project,
  CanBeDone,
  contactPerson,
  willingToConsider,
  projectPlan
} from 'src/app/core/models/project.model';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import { ImageSource } from 'src/app/core/enums/image-upload-source.enum';
import { PipeModule } from 'src/app/shared/pipe.module';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { NzModalRef } from 'ng-zorro-antd';
import { MentorService } from 'src/app/core/services/mentor.service';

@Component({
  selector: 'app-add-studentproject',
  templateUrl: './add-studentproject.component.html',
  styleUrls: ['./add-studentproject.component.css']
})
export class AddStudentprojectComponent implements OnInit {
  sdg = AppConstants.SDG;
  outcome = AppConstants.OUTCOME;
  countryPhoneCode = JSON.parse(
    localStorage.getItem(AppConstants.KEY_COUNTRY_PHONE_CODE)
  );
  partnerId: PartnerId[] = JSON.parse(
    localStorage.getItem(AppConstants.KEY_PARTNER_ID)
  );
  isLoading = false;
  projectForm: FormGroup;
  project: Project;

  documentList: any;
  imageSource = ImageSource.PROJECT;
  mode: String;
  id: any;

  mentorList: any;

  projectWeeklength: any = [];
  monthDurationActive: boolean = false;

  projectImage:any;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddStudentprojectComponent>,
    private projectService: ProjectService,
    private commonService: CommonService,
    private modal: NzModalRef,
    private mentorService: MentorService,
  )
  { 
    this.documentList = [];
  }

  initProjectForm() {
    
    this.projectForm = this.fb.group({
      title: [this.project ? this.project.title : null, Validators.required],
      description: [
        this.project ? this.project.description : null,
        Validators.required,
      ],
      impact: [this.project ? this.project.impact : null],
      location: [this.project ? this.project.location : null],
      // studentOutcome: [this.project ? this.project.studentOutcome : null],
      Milestones: [this.project ? this.project.Milestones : null],
      partner: [this.project ? this.project.partner : null],
      sdg: [this.project ? this.project.sdg : null, Validators.required],
      //skills: [this.project ? this.project.skills : null, Validators.required],
      keyword: [this.project ? this.project.keyword : null, Validators.required],
      documents: [this.project ? this.project.documents : null],
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
      ],
      projectfees: [this.project ? this.project.projectfees : '1',Validators.required],
      questions: this.createQuestionsFormArray(
        this.project ? this.project.questions : []
      ),

      projectPlan: this.getProjectPlan(
        this.project ? this.project.projectPlan : null
      ),
      ProjectDescription: [''],
    });

    if (this.project?.documents && this.project.documents.length > 0) {
        this.project.documents.forEach((image) => {
          this.documentList.push(image);
        });
    }
   
  }

  getMentors() {
    this.mentorService
      .getMentors()
      .subscribe((data) =>
        this.mentorList = data
      );
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

  getProjectPlan(projectPlan: projectPlan) {
    return this.fb.group({
      projectDuration: [projectPlan ? projectPlan.projectDuration : null],
      week1Duration: [projectPlan ? projectPlan.week1Duration : null],
      week2Duration: [projectPlan ? projectPlan.week2Duration : null],
      week3Duration: [projectPlan ? projectPlan.week3Duration : null],
      week4Duration: [projectPlan ? projectPlan.week4Duration : null],
      week5Duration: [projectPlan ? projectPlan.week5Duration : null],
      week6Duration: [projectPlan ? projectPlan.week6Duration : null],
    });
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
    console.log('=======>update',obj);
    
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

  ngOnInit(): void {
    this.initProjectForm();
    this.getMentors();
    this.projectImage = this.project.image;  
    this.projectService
      .getPartnerId()
      .subscribe((data) => this.projectService.savePartnerId(data));
      this.projectForm.get('ask_questions').valueChanges.subscribe((value) => {
      if (value) {
        this.projectForm.setControl('questions', this.fb.array(['']));
      }
    });
    // this.projectForm.patchValue({
    //   projectDuration:this.project.projectPlan.projectDuration,
    //   week1Duration:this.project.projectPlan.week1Duration,
    //   week2Duration:this.project.projectPlan.week2Duration,
    //   week3Duration:this.project.projectPlan.week3Duration,
    //   week4Duration:this.project.projectPlan.week4Duration,
    //   week5Duration:this.project.projectPlan.week5Duration,
    //   week6Duration:this.project.projectPlan.week6Duration,
    // })
    this.defaultProjectduration();
  }
  
  cancel() {
    this.modal.destroy();
  }
  
  changeProjectduration(event) {
    this.projectWeeklength = [];
      if (event.target.value == '3 month' || event.target.value == '4 month' || event.target.value == '5 month' || event.target.value == '6 month' || event.target.value == '7 month' || event.target.value == '8 month' || event.target.value == '9 month') {
        this.monthDurationActive = true;
      }
      else {
        for (let f = 1; f <= event.target.value; f++) {
          this.projectWeeklength.push(f);
        }
        this.monthDurationActive = false;
      }   
  }

  defaultProjectduration(){
    var duration = this.project.projectPlan.projectDuration
    for (let f = 1; f <= duration; f++) {      
      this.projectWeeklength.push(f);
    }
    this.monthDurationActive = false;
  }
}
