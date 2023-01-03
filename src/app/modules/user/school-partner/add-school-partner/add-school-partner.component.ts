import { Component, OnInit, NgModule, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { StaticDataService } from 'src/app/core/services/staticData.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Countries, State, Cities } from 'src/app/core/models/staticData.model';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { SchoolPartnerService } from 'src/app/core/services/school-partner.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolPartnerDetail } from 'src/app/core/models/user.model';


@Component({
  selector: 'app-add-school-partner',
  templateUrl: './add-school-partner.component.html',
  styleUrls: ['./add-school-partner.component.css']
})
export class AddSchoolPartnerComponent implements OnInit {
  isLoading = false;
  schoolPartnerGroup: FormGroup;
  countries: Countries[] = JSON.parse(localStorage.getItem('countries_data'));
  states: State[];
  cities: Cities[];
  studentSchoolBoards = AppConstants.STUDENT_SCHOOL_BOARDS;
  partner: SchoolPartnerDetail;
  
  constructor(
    private fb: FormBuilder,
    private staticDataService: StaticDataService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<AddSchoolPartnerComponent>,
    private schoolPartnerService: SchoolPartnerService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { 
    this.initSchoolPartnerForm();
    this.partner = this.data ? this.data.updatedPartnerInfo : null;   // get existing data of university partner
    if (this.partner) {
      this.editSchoolPartner(this.partner);   // pass existing partner data to editUniversity partner method
    }
  }

  editSchoolPartner(partner: SchoolPartnerDetail): void {
    this.getStateList(partner.country);  // getting state list based on selected country
    this.getCityList(partner.state);    // getting city list based on selected state
    this.schoolPartnerGroup.patchValue({ // set existing forms values
      email: partner.email,
      name: partner.name,
      country: partner.country,
      state: partner.state,
      city: partner.city,
      school_partner: {
        principal_name: partner.school_partner.principal_name,
        counselor_name: partner.school_partner.counselor_name,
        curriculum: partner.school_partner.curriculum,
        other_text: partner.school_partner.other_text
      }

    });
  }

  initSchoolPartnerForm() {
    this.schoolPartnerGroup = this.fb.group({
      email: [null, [Validators.required, CustomValidators.emailValidator]],
      password: [null, Validators.required] ,
      country: [null, Validators.required],
      state: [null, Validators.required],
      city: [null,  Validators.required],
      name: [null, Validators.required],
      school_partner: this.fb.group({
        principal_name: [null, Validators.required],
        counselor_name: [null , Validators.required],
        curriculum: [null, Validators.required],
        other_text: [null]
      })
    });

    this.schoolPartnerGroup.get('state').disable();
    this.schoolPartnerGroup.get('city').disable();
  }

  closeModal() {
    this.dialogRef.close();
  }

  onSelectCountry(country) {
    this.getStateList(country.id);
  }

  getStateList(id) {
    this.staticDataService.getStates(id).subscribe(
      (response) => {
        this.states = response;
        if(this.states.length > 0) {
           this.schoolPartnerGroup.get('state').enable();
        }
      },
      (error) => {
        this.snackbar.open(error.message, null, { duration: 3000 });
      }
    );
  }

  onSubmitForm() {
    this.schoolPartnerGroup.markAllAsTouched();
    if(this.schoolPartnerGroup.invalid) {
      return;
    }

    const formData  = this.schoolPartnerGroup.getRawValue();
    this.isLoading = true;
    if(!this.partner) {
      this.addSchoolPartner(formData);
    } else {
      this.updateSchoolPartner(formData);
    }
  }

  updateSchoolPartner(formObj) {
    this.schoolPartnerService.updateSchoolPartner(formObj, this.partner._id).subscribe(
      (response) => {
        this.isLoading = false;
        Swal.fire({
          title: 'Successful',
          text: 'school partner updated succesfully',
          icon: 'success',
        }).then(() => {
          this.dialogRef.close(true);
        });
      },
      (error) => {
        this.isLoading = false;
        Swal.fire(
          'Failed to update school partner',
          error.message || error.error,
          'error'
        );
      }
    );
  }
  addSchoolPartner(formObj) {
    this.schoolPartnerService.createSchoolPartner(formObj).subscribe(
      (response) => {
        this.isLoading = false;
        Swal.fire({
          title: 'Successful',
          text: 'school partner created succesfully',
          icon: 'success',
        });
        this.dialogRef.close(response);
      },
      (error) => {
        this.isLoading = false;
        Swal.fire(
          'Failed to create school partner',
          error.message || error.error,
          'error'
        );
      }
    );
  }

  getCityList(id) {
    this.staticDataService.getCities(id).subscribe(
      (response) => {
        this.cities = response;
        if(this.cities.length > 0) {
          this.schoolPartnerGroup.get('city').enable();
        }
      },
      (error) => {
        this.snackbar.open(error.message, null, { duration: 3000 });
      }
    );
  }
  onSelectState(state) {
    this.getCityList(state.id);
  }

  ngOnInit(): void {
      this.schoolPartnerGroup.get('school_partner').get('curriculum').valueChanges.subscribe(value=>{
        if(value === 'State board/other') {
          this.schoolPartnerGroup.get('school_partner').get('other_text').setValidators(Validators.required);
          this.schoolPartnerGroup.updateValueAndValidity();
        }
      })  
  }

}

@NgModule({
  declarations: [AddSchoolPartnerComponent],
  imports: [CommonModule, MaterialModule, SharedModule, ReactiveFormsModule],
})
class AddSchoolPartnerModule {}
