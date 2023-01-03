import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageSource } from 'src/app/core/enums/image-upload-source.enum';
import { CommonService } from 'src/app/core/services/common.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { error } from 'protractor';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { UploadlogoService } from 'src/app/core/services/uploadlogo.service';
import { Uploadlogo } from 'src/app/core/models/uploadlogo.model';
import { NzModalRef } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';


enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-add-assign-badge',
  templateUrl: './add-assign-badge.component.html',
  styleUrls: ['./add-assign-badge.component.css']
})
export class AddAssignBadgeComponent implements OnInit {
  isLoading = false;
  uploadLogoForm: FormGroup;
  uploadlogo: Uploadlogo;
  documentList = [];
  imageSource = ImageSource;
  mode: String;
  id: any; 

  show_loader: boolean = false;
  userType: any = "All";
  usersList: any;
  badgeResponse : any;
  badgeList : any;
  dropdownSettings:{};
  userListOptions = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddAssignBadgeComponent>,
    private uploadlogoService: UploadlogoService,
    private commonService: CommonService, 
    private snackbar: MatSnackBar, 
    private utilService: UtilsService,
    private activatedRoute: ActivatedRoute,
    private modal: NzModalRef,
  ) {
  }
 

  onSubmitForm() {
    return new Promise<void>((resolve, reject) => {
      if (this.uploadLogoForm.invalid) {
        return;
      }
      let formData = this.uploadLogoForm.getRawValue();
      console.log("formData : ",formData.assignUserId); 
      formData = this.utilService.removeNullFields(formData);
      this.isLoading = true;
      if (!this.uploadlogo) {
        this.saveAssignBadge(formData).then((response)=>{
          resolve()
        }).catch((e)=>{
          reject();
        });
      } else {
        this.updateAssignBadge(formData).then((response)=>{
          resolve()
        }).catch((e)=>{
          reject();
        });
      }
    })
    
  }

  updateAssignBadge(formData) {
    return new Promise((resolve, reject) => {
      this.uploadlogoService.updateAssignBadge(formData, this.uploadlogo._id).subscribe(
        (uploadlogo) => {
          Swal.fire('Successful', 'Assigned badge updated successfully', 'success');
          this.isLoading = false;
          resolve(uploadlogo)
        },
        (err) => {
          this.isLoading = false;
          Swal.fire(
            'Failed to update badge',
            err.message || err.error,
            'error'
          );
          reject(err)
        }
      );
    })
    
  }

  saveAssignBadge(formData) {
    return new Promise((resolve, reject) => {
      this.uploadlogoService.saveAssignBadge(formData).subscribe(
        (uploadlogo) => {
          Swal.fire('Successful', 'Assigned badge succesfully', 'success');
          this.isLoading = false;
          resolve(uploadlogo)
        },
        (err) => {
          this.isLoading = false;
          Swal.fire('Failed to upload badge', err.message || err.error, 'error');
          reject(err)
        }
      );
    })
  }

  ngOnInit(): void {
    this.uploadLogoForm = this.fb.group({
      badgeId: ['',Validators.required],
      userType:['',Validators.required],
      assignUserId: ['',Validators.required],
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.getActiveBadgeList(params);      
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      /* limitSelection: 4, */
    };
  }
  cancel() {
    this.modal.destroy();
  }

  updateuserType(event){
    console.log(event);
    this.userType= event;
    this.getUsersList();
  }

  getUsersList() {
    this.isLoading = true;    
    this.show_loader = true;
    this.uploadlogoService.getUsersList(this.userType).subscribe(
      (users) => {
        this.usersList = users; 
        console.log("users list", this.usersList);
        this.isLoading = false; 
        this.show_loader = false;       
     /*    let eventGuest = [];
        let eventUsers = this.usersList;
        for (let i in this.usersList) {
          let eventUsersObj = _.find(this.userListOptions, { item_id: eventUsers[i]._id });
          if(eventUsersObj)
          eventGuest.push(eventUsersObj);
        }
        this.uploadLogoForm.controls.assignUserId.patchValue(eventGuest); */

      },
      (error) => {
        this.isLoading = false;
        this.show_loader = false; 
        this.snackbar.open(error.message, null, { duration: 3000 });
      }
    );
  }

  getActiveBadgeList(filter) {
    this.isLoading = true;
    this.uploadlogoService.getActiveBadgeList(filter).subscribe( response =>{
      this.badgeResponse = response;
      this.badgeList = this.badgeResponse.data;
      console.log("badgeList : ",this.badgeList)
      if(response.totalDocs - (+filter.limit) < -11) {
        this._showSnackbar("No more data found")
      }
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.snackbar.open(error.message, null , {duration: 3000});
    });
  }


  _showSnackbar(message) {
    this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
  }

  addingGuest(userslist) {
    // console.log("Selected userslist",userslist,this.scheduleEventForm);
   }

   public hasErrorEvent = (controlName: string, errorName: string) => { 
    return this.uploadLogoForm.controls[controlName].hasError(errorName);
  };

}
