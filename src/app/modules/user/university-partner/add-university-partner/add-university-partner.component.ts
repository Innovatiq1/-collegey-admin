import { Component, OnInit, NgModule, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { StaticDataService } from 'src/app/core/services/staticData.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddImpactPartnerComponent } from '../../impact-partner/add-impact-partner/add-impact-partner.component';
import { Countries, State, Cities } from 'src/app/core/models/staticData.model';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { UniversityPartnerService } from 'src/app/core/services/university-partner.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UniversityPartnerDetail } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-add-university-partner',
  templateUrl: './add-university-partner.component.html',
  styleUrls: ['./add-university-partner.component.css']
})
export class AddUniversityPartnerComponent implements OnInit {

  isLoading = false;
  universityPartnerGroup: FormGroup;
  countries: Countries[] = JSON.parse(localStorage.getItem('countries_data'));
  countryPhoneCode = JSON.parse(localStorage.getItem(AppConstants.KEY_COUNTRY_PHONE_CODE));
  states: State[];
  cities: Cities[];
  contactPersonFormArray: FormArray;
  partner: UniversityPartnerDetail;
  
  constructor(
    private fb: FormBuilder,
    private staticDataService: StaticDataService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<AddUniversityPartnerComponent>,
    private universityPartnerService: UniversityPartnerService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { 
    this.initUniversityPartnerForm();
    this.partner = this.data ? this.data.updatedPartnerInfo : null;   // get existing data of university partner
    if (this.partner) {
      this.editUniversityPartner(this.partner);   // pass existing partner data to editUniversity partner method
    }
  }

  editUniversityPartner(partner: UniversityPartnerDetail): void {
    this.getStateList(partner.country);  // getting state list based on selected country
    this.getCityList(partner.state);    // getting city list based on selected state
    this.universityPartnerGroup.patchValue({ // set existing forms values
      email: partner.email,
      name: partner.name,
      country: partner.country,
      state: partner.state,
      city: partner.city,
      university_partner: {
        contact_person_for_collegey: [{
          name: partner.university_partner.contact_person_for_collegey[0].name,
          phone_number: {
            number: partner.university_partner.contact_person_for_collegey[0].phone_number[0].number,
            extension: partner.university_partner.contact_person_for_collegey[0].phone_number[0].extension
          }
        }],
        address: partner.university_partner.address
      }

    });
  }

  initUniversityPartnerForm() {
    this.universityPartnerGroup = this.fb.group({
      email: [null, [Validators.required, CustomValidators.emailValidator]],
      password: [null, Validators.required] ,
      country: [null, Validators.required],
      state: [null, Validators.required],
      city: [null,  Validators.required],
      name: [null, Validators.required],
      university_partner: this.fb.group({
        contact_person_for_collegey: this.fb.array([this.generateContactPersonGroup()]),
        address: [null , [Validators.required]]
      })
    });

    this.universityPartnerGroup.get('state').disable();
    this.universityPartnerGroup.get('city').disable();
    this.contactPersonFormArray = this.typeCastToFormArray(this.universityPartnerGroup.get('university_partner').get('contact_person_for_collegey'));
  }

  typeCastToFormArray(formGroup){
    return formGroup as FormArray;
  }

  generateContactPersonGroup() {
    return this.fb.group({
      name: [null ,  Validators.required],
      phone_number: this.generatePhoneNumberGroup()
    })
  }

  closeModal() {
    this.dialogRef.close();
  }

  generatePhoneNumberGroup() {
    return this.fb.group({
      extension: [null , Validators.required],
      number: [null , [Validators.required, CustomValidators.phoneValidator]],
      tag: ['primary']

    })
  }

  onSelectCountry(country) {
    this.getStateList(country.id);
  }

  getStateList(id) {
    this.staticDataService.getStates(id).subscribe(
      (response) => {
        this.states = response;
        if(this.states.length > 0) {
           this.universityPartnerGroup.get('state').enable();
        }
      },
      (error) => {
        this.snackbar.open(error.message, null, { duration: 3000 });
      }
    );
  }

  onSubmitForm() {
    this.universityPartnerGroup.markAllAsTouched();
    if(this.universityPartnerGroup.invalid) {
      return;
    }

    const formData  = this.universityPartnerGroup.getRawValue();
    this.isLoading = true;
    if(!this.partner) {
      this.addUniversityPartner(formData);
    } else {
      this.updateUniversityPartner(formData);
    }
  }

  updateUniversityPartner(formObj) {
    this.universityPartnerService.updateUniversityPartner(formObj, this.partner._id).subscribe(
      (response) => {
        this.isLoading = false;
        Swal.fire({
          title: 'Successful',
          text: 'university partner updated succesfully',
          icon: 'success',
        }).then(() => {
          this.dialogRef.close(true);
        });
      },
      (error) => {
        this.isLoading = false;
        Swal.fire(
          'Failed to update university partner',
          error.message || error.error,
          'error'
        );
      }
    );
  }
  addUniversityPartner(formObj) {
    this.universityPartnerService.createUniversityPartner(formObj).subscribe(
      (response) => {
        this.isLoading = false;
        Swal.fire({
          title: 'Successful',
          text: 'University partner created succesfully',
          icon: 'success',
        });
        this.dialogRef.close(response);
      },
      (error) => {
        this.isLoading = false;
        Swal.fire(
          'Failed to create university partner',
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
          this.universityPartnerGroup.get('city').enable();
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
  }

}

@NgModule({
  declarations: [AddUniversityPartnerComponent],
  imports: [CommonModule, MaterialModule, SharedModule, ReactiveFormsModule],
})
class AddUniversityPartnerModule {}


