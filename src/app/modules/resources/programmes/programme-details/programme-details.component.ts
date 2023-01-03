import { Component, OnInit } from '@angular/core';
import { ProgrammesService } from 'src/app/core/services/programmes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/core/services/dialog.service';
import { Programme } from 'src/app/core/models/programmes.model';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { AddProgrammesComponent } from '../add-programmes/add-programmes.component';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-programme-details',
  templateUrl: './programme-details.component.html',
  styleUrls: ['./programme-details.component.css']
})
export class ProgrammeDetailsComponent implements OnInit {
  isLoading = false;
  programmeDetails: Programme;
  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private programmesService: ProgrammesService,
    private matSnackBar: MatSnackBar,
    private dialogService: DialogService,
    public commonService: CommonService
  ) { }

  _getProgrammeDetail(id) {
    this.isLoading = true;
    this.programmesService.getProgramDetails(id).subscribe(detail => {
      this.programmeDetails = detail;
      this.isLoading = false;
    },(error) => {
      this.isLoading = false;
      this.matSnackBar.open(error.error || error.message, null, {
          duration: AppConstants.TOAST_DISPLAY_TIME
      });
  });
  }

  editProgramme(){
    const dialogConfig = this.dialogService.configureDialog({
      programme: this.programmeDetails
  });
    this.dialog.open(AddProgrammesComponent, dialogConfig).afterClosed().subscribe(programmeDetails => {
      if (programmeDetails) {
          this.programmeDetails = programmeDetails;
      }
  });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(urlParam => {
      this._getProgrammeDetail(urlParam.get('id'));
  });
  }

}
