import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NzModalRef } from 'ng-zorro-antd';
import { ImageSource } from 'src/app/core/enums/image-upload-source.enum';
import { Team } from 'src/app/core/models/team.model';
import { TeamService } from 'src/app/core/services/team.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-boardof-advisors',
  templateUrl: './add-boardof-advisors.component.html',
  styleUrls: ['./add-boardof-advisors.component.css']
})
export class AddBoardofAdvisorsComponent implements OnInit {

  isLoading = false;
  teamForm: FormGroup;
  team: Team;
  documentList = [];
  imageSource = ImageSource.TEAM_MEMBER;
  mode: String;
  id: any;

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private utilService: UtilsService,
    public dialogRef: MatDialogRef<AddBoardofAdvisorsComponent>,
    private modal: NzModalRef,
  ) {
  }

  initTeamForm() {
    this.teamForm = this.fb.group({
      name: [this.team ? this.team.name : null, Validators.required],
      designation: [
        this.team ? this.team.designation : null,
        Validators.required,
      ],
      description: [
        this.team ? this.team.description : null,
        Validators.required,
      ],
      lindkin: [this.team ? this.team.lindkin : null,
        CustomValidators.urlValidator],
      position: [this.team ? this.team.position : null, Validators.required],
      image: [this.team ? this.team.image : null],
    });

    if(this.team?.image) {
      this.documentList.push(this.team.image);
    }

  }

  addTagFn(name) {
    return { name };
  }

  onFileUpload(list) {
    this.teamForm.patchValue({
      image: list[0],
    });
  }

  onSubmitForm() {
    return new Promise<void>((resolve, reject) => {
      this.teamForm.markAllAsTouched();
      if (this.teamForm.invalid) {
        return;
      }
      let formData = this.teamForm.getRawValue();
      const tags = [];
      /* formData.tags.forEach((tag) => {
        if(tag.label) {
          tags.push(tag.label);
        } else {
          tags.push(tag);
        }
      });
      formData.tags = tags; */
      if (formData.status) {
        formData.status = 1;
      } else {
        formData.status = 2;
      }
      formData = this.utilService.removeNullFields(formData);
      this.isLoading = true;
      if (!this.team) {
        this.saveTeam(formData).then((response)=>{
          resolve()
        }).catch((e)=>{
          reject();
        });
      } else {
        this.updateTeam(formData).then((response)=>{
          resolve()
        }).catch((e)=>{
          reject();
        });
      }
    })
    
  }

  updateTeam(formData) {
    return new Promise((resolve, reject) => {
      this.teamService.updateBoardofAdvisors(formData, this.team._id).subscribe(
        (team) => {
          Swal.fire('Successful', 'Team member updated successfully', 'success');
          this.isLoading = false;
          // this.dialogRef.close(conference);
          resolve(team)
        },
        (err) => {
          this.isLoading = false;
          Swal.fire(
            'Failed to update conference',
            err.message || err.error,
            'error'
          );
          reject(err)
        }
      );
    })
    
  }
  saveTeam(formData) {
    return new Promise((resolve, reject) => {
      this.teamService.createBoardofAdvisors(formData).subscribe(
        (team) => {
          Swal.fire('Successful', 'Team member added succesfully', 'success');
          this.isLoading = false;
          // this.dialogRef.close(conference);
          resolve(team)
        },
        (err) => {
          this.isLoading = false;
          Swal.fire('Failed to add team member', err.message || err.error, 'error');
          reject(err)
        }
      );
    })
  }

  ngOnInit(): void {
    this.initTeamForm();
    if (!this.team) {
      this.teamForm.patchValue({
        lindkin: 'https://www.',
      });
    }
  }
  cancel() {
    this.modal.destroy();
  }



}
