import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StaticDataService } from 'src/app/core/services/staticData.service';
import { Projects, BigPictureProject, DescribeProject, WritingSample, Recommendation, Award } from 'src/app/core/models/student-profile.model';
import Swal from 'sweetalert2';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

enum IMAGE_Form_Arrays {
  WRITING_SAMPLE = 'writing_sample',
  RECOMMENDATION = 'someone_said_something_or_recommendation',
  AWARD = 'award',
  DESCRIBE_ANY_PROJECT = 'describe_any_project'
}
import { map } from 'rxjs/operators'
import { ImageSource } from 'src/app/core/enums/image-upload-source.enum';

@Component({
  selector: 'app-student-studied',
  templateUrl: './student-studied.component.html',
  styleUrls: ['./student-studied.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentStudiedComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-output-on-prefix
  studentSchoolBoards = AppConstants.STUDENT_SCHOOL_BOARDS;
  studentClassOptions = AppConstants.STUDENT_CLASS_OPTIONS;
  studentFavoriteSubjects = AppConstants.STUDENT_FAVORITE_SUBJECTS;
  imageFormArrays = IMAGE_Form_Arrays;
  isLoading = false;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  
  studentProjectForm: FormGroup;
  studentStudiedForm: FormGroup;
  @Input() studentProfileData;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSubmitStudiedForm =  new EventEmitter();
  studiedFormSubscription: Subscription;
  panelOpenState = false;
  projectFormAbstractControl: AbstractControl;
  

  constructor(
    private fb: FormBuilder,
    private staticDataService: StaticDataService,
    private cdr: ChangeDetectorRef
  ) { }
    
  initStudiedForm() {
    let studentJsonData: Observable<FormGroup>;
    if (Object.keys(this.studentProfileData).length > 0) {
      studentJsonData = of(this.studentProfileData);
    } else {
      studentJsonData = this.staticDataService.getStaticProfileForm();
    }
    return studentJsonData.pipe(
      map((apiResponse: any) =>
        this.fb.group({
          student_profile: this.fb.group({
            projects: this.generateProjectForm(
              apiResponse.student_profile.projects
            ),
          }),
        })
      )
    );
  }

  typeCastToFormArray(formGroup: string) {
    return this.studentProjectForm.get('student_profile').get('projects').get(formGroup) as FormArray;
  }

  generateProjectForm(project: Projects) {
    const form = this.fb.group({
      any_bpp: this.createBPPGroup(project.any_bpp),
      describe_any_project: this.createDescribeAnyProjectGroup(project.describe_any_project),
      writing_sample: this.createWritingSampleGroup(project.writing_sample),
      someone_said_something_or_recommendation: this.createRecommendationGroup(project.someone_said_something_or_recommendation),
      award: this.createAwardGroup(project.award), 
      is_completed: [false],
    });
    console.log(form.getRawValue());
    return form;
  }

  onRemoveFormGroup(index, formGroup) {
    this.typeCastToFormArray(formGroup
    ).removeAt(index);
  }

  createAwardGroup(award) {
    return this.fb.array(award.length > 0 ? award.map(item => this.addAwardGroup(item)) : [this.addAwardGroup()]);
  }

  addAwardGroup(award?: Award) {
    return this.fb.group({
      title: [award ? award.title : null],
      description: [award ? award.description : null],
      file: [award ? award.file : null],
      duration: [award ? award.duration: null],
      role: [award ? award.role : null],
      issuing_organisation: [award ? award.issuing_organisation : null]
    });
  }

  createRecommendationGroup(recommendation) {
    return this.fb.array(recommendation.length > 0 ? recommendation.map( item => this.addRecommendationGroup(item)) :
    [this.addRecommendationGroup()]);

  }

  onAddRecommendation() {
    this.typeCastToFormArray('someone_said_something_or_recommendation').push(this.addRecommendationGroup());
  }

  addRecommendationGroup(recommendation? : Recommendation) {
    return this.fb.group({
      title: [recommendation ? recommendation.title : null],
      description: [recommendation ? recommendation.description : null],
      file: [recommendation ? recommendation.file : null]
    });
  }

  createWritingSampleGroup(writingSample) {
    return this.fb.array((writingSample && writingSample.length > 0) ? writingSample.map(item => this.addWritingSampleGroup(item)) :
    [this.addWritingSampleGroup()]);

  }

  addWritingSampleGroup(writingSample?: WritingSample) {
    return this.fb.group({
      title: [writingSample ? writingSample.title : null],
      description: [writingSample ? writingSample.description : null],
      answer: [writingSample ? writingSample.answer : null],
      file: [writingSample ? writingSample.file : null]
    });
  }

  createDescribeAnyProjectGroup(project) {
    return this.fb.array(project.length > 0 ? project.map(item => this.addDescribeProjectGroup(item)) :
    [this.addDescribeProjectGroup()]);
  }

  onAddDescribeProjectSection() {
    this.typeCastToFormArray('describe_any_project').push(this.addDescribeProjectGroup());
  }

  addDescribeProjectGroup(project?: DescribeProject) {
    return this.fb.group({
      title: [project ? project.title : null],
      description: [project ? project.description : null]
    });

  }

  createBPPGroup(bpp: BigPictureProject) {
    return this.fb.group({
      answer: [bpp ? bpp.answer : null],
      title: [bpp ? bpp.title : null],
      description: [bpp ? bpp.description : null]
    });
  }

  onSubmit() {
    console.log(this.studentProjectForm.getRawValue());
  }

  onSelectFile(event, index , formArray) {
    // called each time file input changes
    if (event.target.files && event.target.files.length > 0) {
      const imagesFileList = [];
      const input = event.target;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < input.files.length; i++) {
        imagesFileList.push(input.files[i]);
      }
      this.isLoading = true;
      const formData = new FormData();
      if (imagesFileList.length > 0) {
        imagesFileList.forEach((file) => {
          formData.append('files', file);
        });
      }
      if (imagesFileList.length > 1) {
        formData.append('type', 'array');
      } else {
        formData.append('type', 'single');
      }
      this.staticDataService.uploadImage(formData,ImageSource.PROJECT).subscribe((res) => {
        if(res) {
          this.isLoading = false;
          let imageResponse = res;
          if(Array.isArray(imageResponse)) {
              imageResponse = res;
          } else {
            imageResponse = res.split();
          }

          this.typeCastToFormArray(formArray).at(index).patchValue(
            {
              file: imageResponse,
            });
          this.cdr.detectChanges();
        }

        },
          (error) => {
            this.isLoading = false;
            Swal.fire(
              'Failed to upload image',
              error.message || error.error,
              'error'
            );
          }
      );
    }
  }

  addTagFn(name) {
    return { name};
  }

  onSubmitForm() {
    this.onSubmitStudiedForm.emit(this.studentProjectForm.getRawValue());
  }

  ngOnInit(): void {
    this.studiedFormSubscription = this.initStudiedForm().subscribe((form) => {
    this.studentProjectForm = form;
    this.projectFormAbstractControl = this.studentProjectForm.get('student_profile').get('projects');
    });
  }

  ngOnDestroy(): void {
    this.studiedFormSubscription.unsubscribe();
  }

}
