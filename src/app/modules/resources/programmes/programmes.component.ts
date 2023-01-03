import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from 'src/app/core/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { ProgrammesService } from 'src/app/core/services/programmes.service';
import { Programme } from 'src/app/core/models/programmes.model';
import { AddProgrammesComponent } from './add-programmes/add-programmes.component';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/shared/constants/app.constants';

@Component({
  selector: 'app-programmes',
  templateUrl: './programmes.component.html',
  styleUrls: ['./programmes.component.css']
})
export class ProgrammesComponent implements OnInit {
  isLoading = false;
  programmeList: Programme[] = [];
  constructor(
    private programmeService: ProgrammesService,
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
  ) { }

  addNewProgramme() {
    const dialogConfig = this.dialogService.configureDialog(null);
    this.dialog.open(AddProgrammesComponent, dialogConfig).afterClosed().subscribe(response => {
      if(response) {
        this.programmeList.push(response);
      }
    })
  }

  _getProgrammes(filter) {
    this.isLoading = true;
    this.programmeService.getProgrammesList(filter).subscribe(programme => {
      this.isLoading = false;
      this.programmeList  = programme.docs;
      console.log(this.programmeList);
      if(programme.totalDocs - (+filter.limit) < -11) {
        this._showSnackbar("No more data found")
      }
    }, (error) => {
      this.isLoading = false;
      this.snackBar.open(error.message || error.error, null);
    });

  }

  _showSnackbar(message) {
    this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this._getProgrammes(params);
    });
  }

}
