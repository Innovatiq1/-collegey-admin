import { Component, OnInit, Inject } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { ProgrammesService } from 'src/app/core/services/programmes.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Programme } from 'src/app/core/models/programmes.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageSource } from 'src/app/core/enums/image-upload-source.enum';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import Swal from 'sweetalert2';
import { NzModalRef } from 'ng-zorro-antd';
import { MentorService } from 'src/app/core/services/mentor.service';

@Component({
  selector: 'app-add-programmes',
  templateUrl: './add-programmes.component.html',
  styleUrls: ['./add-programmes.component.css']
})
export class AddProgrammesComponent implements OnInit {
  submitted:boolean=false
  programme: Programme;
  programmeForm: FormGroup;
  isLoading = false;
  documentList = [];
  imageSource = ImageSource.PROGRAMME;
  mode: String;
  id: any;
  mentorList: any;
  constructor(
    private fb: FormBuilder,
    private programmeService: ProgrammesService,
    private utilService: UtilsService,
    public dialogRef: MatDialogRef<AddProgrammesComponent>,
    private modal: NzModalRef,
    private mentorService: MentorService,
  ) { 
  }

  initProgrammeForm() {
    console.log("this.programme",this.programme);
    this.programmeForm  = this.fb.group({
      title: [this.programme ? this.programme.title : null , Validators.required],
      short_description: [
        this.programme ? this.programme.short_description : null,
        Validators.required,
      ],
      redirect_link: [this.programme ? this.programme.redirect_link : null, CustomValidators.urlValidator],
      including_tax: [this.programme ? this.programme.including_tax : 'Including taxes', Validators.required],
      program_hour_text: [this.programme ? this.programme.program_hour_text : '4 - 6 hours/week for 4 weeks', Validators.required],
      deliverable: [this.programme ? this.programme.deliverable : null, Validators.required],
      mentor: [this.programme ? this.programme.mentor : null],
      category: [this.programme ? this.programme.category : null, Validators.required],
      tags: [this.programme ? this.programme.tags : null, Validators.required],
      is_paid: [this.programme ? this.programme.is_paid : null, Validators.required],
      cost: [this.programme ? this.programme.cost : null],
      status: [this.programme ? (this.programme.status === 1 ? true : false) : null],
      image: [this.programme ? this.programme.image : null],
      description: [
        this.programme ? this.programme.description : null,
        Validators.required,
      ],
    });

    if(this.programme?.image) {
      this.documentList.push(this.programme.image);
    }
  }

  addTagFn(name) {
    return { name };
  }

  onFileUpload(list) {

    if(list.length > 0) {
      this.programmeForm.patchValue({
        image: list[0],
      });
    } else {
      this.programmeForm.patchValue({
        image: null,
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

  onSubmitForm() {
    this.submitted =true
    return new Promise<void>((resolve, reject) => {
      this.programmeForm.markAllAsTouched();
      if(this.programmeForm.invalid) {
        return;
      }
      let formData = this.programmeForm.getRawValue();
      const tags = [];
      formData.tags.forEach((tag) => {
        if(tag.label) {
          tags.push(tag.label);
        } else {
          tags.push(tag);
        }
      });
      formData.tags = tags;
      if (formData.status) {
        formData.status = 1;
      } else {
        formData.status = 2;
      }
      formData = this.utilService.removeNullFields(formData);
      this.isLoading = true;
      if (!this.programme) {
        this.saveProgrammes(formData).then((response)=>{
          resolve()
        }).catch((e)=>{
          reject();
        });
      } else {
        this.updateProgrammes(formData).then((response)=>{
          resolve()
        }).catch((e)=>{
          reject();
        });
      }
    })
    
  }

  updateProgrammes(formData) {
    return new Promise((resolve, reject) => {
      this.programmeService.updatePrograms(formData, this.programme.id).subscribe(programme => {
        Swal.fire('Successful', 'Programme updated successfully', 'success');
        this.isLoading = false;
        // this.dialogRef.close(programme);
        resolve(programme)
      },
      (err) => {
        this.isLoading = false;
        Swal.fire(
          'Failed to update programme',
          err.message || err.error,
          'error'
        );
        reject(err)
      });
    })
    
  }

  saveProgrammes(formData) {
    return new Promise((resolve, reject) => {
      this.programmeService.saveProgrammes(formData).subscribe(programme => {
        Swal.fire('Successful', 'Programme added succesfully', 'success');
        this.isLoading = false;
        resolve(programme)
        // this.dialogRef.close(programme);
      }, (err) => {
        this.isLoading = false;
        Swal.fire('Failed to add programme', err.message || err.error, 'error');
        reject(err)
      });
    })
    

  }

  ngOnInit(): void {
    this.getMentors();
    this.initProgrammeForm();
    if (!this.programme) {
      this.programmeForm.patchValue({
        redirect_link: 'https://www.',
      });
    }
  }
  cancel() {
    this.modal.destroy();
  }

}
