import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { NzModalRef } from 'ng-zorro-antd';
import referralCodeGenerator from 'referral-code-generator';
import Swal from 'sweetalert2';

// Load Services
import { InviteeService } from 'src/app/core/services/invitee.service';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}
@Component({
  selector: 'app-add-invite',
  templateUrl: './add-invite.component.html',
  styleUrls: ['./add-invite.component.css']
})
export class AddInviteComponent implements OnInit {

  form: FormGroup;
  // inviteeTypes: String[] = ['student','Counsellor','College','mentor','Imapct Partner','Parent','Allumini','High-school student','High-school counselor'];
  // inviteeTypesData : String[] = ['student','Counsellor','College','mentor','Imapct Partner','Parent','Allumini','High-school student','High-school counselor']

  inviteeTypes:any = [
    {type:'Student',value:'student'},
    {type:'Mentor',value:'mentor'},
    {type:'High School Student',value:'student'},
  ]


  mode: String;
  id: any; 
  invitee : any;

  constructor(
    private fb: FormBuilder,
    private inviteeService: InviteeService,
    private modal: NzModalRef,
  ) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.createForm();
    if (this.mode === Mode.Edit) {
      this.fetchInvitee();
    } else {
      // this.isSpinning = false;
    }
  }

  fetchInvitee() {
    this.inviteeService.getInviteeJoinInfo(this.id).subscribe(
      (invitee) => {
        if (invitee) {
          this.patchForm(invitee);
          // this.isSpinning = false;
        }
      },
      (err) => {
        // this.isSpinning = false;
      },
      () => {
        // this.isSpinning = false;
      }
    );
  }

  patchForm(invitee) {
    this.invitee = invitee;
    this.form.patchValue({
      type: invitee.type,
      firstName: invitee.firstName,
      lastName: invitee.lastName || null,
      email: invitee.email || null,
      referemail: invitee.referemail || null,
      linkedIn: invitee.linkedIn || null,
      other: invitee.other || null,
      cellNumber:invitee.cellNumber || null
    });
    this.markAllTouched();
  }

  createForm() {
    this.form = this.fb.group(
      {
        type: ["", [Validators.required]],
        firstName: ["", [Validators.required]],
        lastName: ["", [Validators.required]],
        email: ["", [Validators.required]],
        referemail: ["",],
        linkedIn: ["", [Validators.required]],
        other: ["",],
        cellNumber: ["", [Validators.required]],
      },
    );
    // this.coursesFromArray.push(this.fb.group([]));
    this.form.valueChanges.subscribe(() => {
      
    });
  }

  save() {
    return new Promise<void>((resolve, reject) => {
      this.markAllTouched();
      if (this.form.valid) {
        if (this.mode === Mode.Create) {
          console.log(this.form.value);
          this.form.value.status = 'invite join';
          this.form.value.activation_code = referralCodeGenerator.custom('uppercase', 6, 2, this.form.value.email.split('@')[0]+this.form.value.firstName+this.form.value.lastName);
          this.form.value.isActive = false;
          this.inviteeService.createInviteeJoin(this.form.value).subscribe(
            (res) => {
              this.id = res._id;
              // this.messageService.create("success", `Diagnostic Created`);
              this.modal.destroy();
              resolve();
            },
            (err) => {
              debugger;
              // this.messageService.create("error", `Something went wrong`);
              // this.isSpinning = false;
              reject();
            },
            () => {
              // this.isSpinning = false;
              reject();
            }
          );
        } else {
          // this.spinMode = SpinMode.EDIT;
          // this.isSpinning = true;
          console.log(this.form.value);
          this.inviteeService.updateInviteejoin(this.form.value, this.id).subscribe(
            (res) => {
              // this.messageService.create("success", `Diagnostic Updated`);
              Swal.fire({
                title: 'Successful',
                text: 'Update Invitees Join Succesfully',
                icon: 'success',
              });
              resolve();
            },
            (err) => {
              // this.messageService.create("error", `Something went wrong`);
              // this.isSpinning = false;
              Swal.fire(
                'Failed to Invitees Join',
                'error'
              );
              reject();
            },
            () => {
              // this.isSpinning = false;
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
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
  }

}
