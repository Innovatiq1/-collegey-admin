import { Component, OnInit, NgModule, Inject, EventEmitter, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SharedModule } from 'src/app/shared/shared.module';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { Blog } from 'src/app/core/models/blog.model';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import { ImageSource } from 'src/app/core/enums/image-upload-source.enum';
import { PipeModule } from 'src/app/shared/pipe.module';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular/ckeditor';
import { resolve } from 'dns';
import { NzModalRef } from 'ng-zorro-antd';
import { Mentor } from 'src/app/core/models/mentor';
import { MentorService } from 'src/app/core/services/mentor.service';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-show-mentor-information',
  templateUrl: './show-mentor-information.component.html',
  styleUrls: ['./show-mentor-information.component.css']
})
export class ShowMentorInformationComponent implements OnInit {

  mentor: Mentor;
  ProfileData: any;
  mentorData:any;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ShowMentorInformationComponent>,
    private mentorService: MentorService,
    public commonService: CommonService,
    private modal: NzModalRef,
  ) { }

  ngOnInit(): void {
    this.mentorData=this.mentor;
    console.log("this.mentorData=======",this.mentorData);
    
    this.getCurrentUserData();
  }

  getCurrentUserData()
  {
    const obj = {
      userid: this.mentor?._id,
    };
    this.mentorService.getCurrentMentorDataFetch(obj).subscribe(
      (response) => { 
        this.ProfileData = response?.data;
        console.log("this.ProfileData====",this.ProfileData);
      }, 
      (err) => {
        
      },
    );   
  }

  closeModal() {
    this.dialogRef.close();
  }

  sliceImageName(file) {
    return file.slice(27);
  }
  
  cancel() {
    this.modal.destroy();
  }

}

@NgModule({
  declarations: [ShowMentorInformationComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    PipeModule,
  ],
})
class AddMentorsModule {}