import { Component, OnInit, NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { Countries, State, Cities } from 'src/app/core/models/staticData.model';
import { StaticDataService } from 'src/app/core/services/staticData.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImpactPartnersService } from 'src/app/core/services/impact-partner.service';
import Swal from 'sweetalert2';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { ImpactPartnerDetail } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-add-impact-partner',
  templateUrl: './add-impact-partner.component.html',
  styleUrls: ['./add-impact-partner.component.css']
})
export class AddImpactPartnerComponent implements OnInit {

  isLoading = false;
  impactPartnerFormGroup: FormGroup;
  countries: Countries[] = JSON.parse(localStorage.getItem('countries_data'));
  countryPhoneCode = JSON.parse(localStorage.getItem(AppConstants.KEY_COUNTRY_PHONE_CODE));
  states: State[];
  cities: Cities[];

  phoneNumberFormArray: FormArray;
  contactPersonFormArray: FormArray;
  partner: ImpactPartnerDetail;


  constructor(
    private fb: FormBuilder,
    private staticDataService: StaticDataService,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<AddImpactPartnerComponent>,
    private impactPartnersService: ImpactPartnersService,
    @Inject(MAT_DIALOG_DATA) public data: any

    ) {
      this.initImpactPartnerForm();
      this.partner = this.data ? this.data.updatedPartnerInfo : null;
      if (this.partner) {
        this.editImpactPartner(this.partner);   // pass existing partner data to editUniversity partner method
      }

    }

    editImpactPartner(partner: ImpactPartnerDetail): void {
      this.getStateList(partner.country);  // getting state list based on selected country
      this.getCityList(partner.state);    // getting city list based on selected state
      this.impactPartnerFormGroup.patchValue({ // set existing forms values
        email: partner.email,
        name: partner.name,
        country: partner.country,
        state: partner.state,
        city: partner.city,
        phone_number: [{
          number: partner.phone_number[0].number,
          extension: partner.phone_number[0].extension
        }],
        impact_partner: {
          contact_person_for_collegey: [{
            name: partner.impact_partner.contact_person_for_collegey[0].name,
            phone_number: {
              extension: partner.impact_partner.contact_person_for_collegey[0].phone_number[0].extension,
              number: partner.impact_partner.contact_person_for_collegey[0].phone_number[0].number
            }
          }],
          website: partner.impact_partner.website
        }
      });
    }
  initImpactPartnerForm() {
    this.impactPartnerFormGroup = this.fb.group({
      email: [null, [Validators.required, CustomValidators.emailValidator]],
      password: [null, Validators.required] ,
      country: [null, Validators.required],
      state: [null, Validators.required],
      city: [null,  Validators.required],
      name: [null, Validators.required],
      phone_number: this.fb.array([this.generatePhoneNumberGroup()]),
      impact_partner: this.fb.group({
        // organization_name: [null, Validators.required],
        contact_person_for_collegey: this.fb.array([this.generateContactPersonGroup()]),
        website: [null, [Validators.required, CustomValidators.urlValidator]]
      })
    });

    this.impactPartnerFormGroup.get('state').disable();
    this.impactPartnerFormGroup.get('city').disable();
    this.phoneNumberFormArray = this.typeCastToFormArray(this.impactPartnerFormGroup.get('phone_number'));
    this.contactPersonFormArray = this.typeCastToFormArray(this.impactPartnerFormGroup.get('impact_partner').get('contact_person_for_collegey'));

    console.log(this.contactPersonFormArray);

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
           this.impactPartnerFormGroup.get('state').enable();
        }
      },
      (error) => {
        this.snackbar.open(error.message, null, { duration: 3000 });
      }
    );
  }

  closeModal() {
    this.dialogRef.close();
  }

  getCityList(id) {
    this.staticDataService.getCities(id).subscribe(
      (response) => {
        this.cities = response;
        if(this.cities.length > 0) {
          this.impactPartnerFormGroup.get('city').enable();
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

  onSubmitForm() {
    this.impactPartnerFormGroup.markAllAsTouched();
    if(this.impactPartnerFormGroup.invalid) {
      return; 
    }

    const formData  = this.impactPartnerFormGroup.getRawValue();
    this.isLoading = true;
    if(!this.partner) {
      this.addImpactPartner(formData);
    }else {
      this.updateImpactPartner(formData);
    }
  }

  updateImpactPartner(formObj) {
    this.impactPartnersService.updateImpactPartner(formObj, this.partner._id).subscribe(
      (response) => {
        this.isLoading = false;
        Swal.fire({
          title: 'Successful',
          text: 'impact partner updated succesfully',
          icon: 'success',
        }).then(() => {
          this.dialogRef.close(true);
        });
      },
      (error) => {
        this.isLoading = false;
        Swal.fire(
          'Failed to update impact partner',
          error.message || error.error,
          'error'
        );
      }
    );

  }

  addImpactPartner(formObj) {
    this.impactPartnersService.createImpactPartner(formObj).subscribe(
      (response) => {
        this.isLoading = false;
        Swal.fire({
          title: 'Successful',
          text: 'Impact partner created succesfully',
          icon: 'success',
        });
        this.dialogRef.close(response);
      },
      (error) => {
        this.isLoading = false;
        Swal.fire(
          'Failed to create impact partner',
          error.message || error.error,
          'error'
        );
      }
    );
  }
 
  ngOnInit(): void {

  }

}

@NgModule({
  declarations: [AddImpactPartnerComponent],
  imports: [CommonModule, MaterialModule,SharedModule, ReactiveFormsModule],
})
class AddImpactPartnerModule {}
