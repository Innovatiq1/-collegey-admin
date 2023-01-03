import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConferenceService } from 'src/app/core/services/conference.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from 'src/app/core/services/dialog.service';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { Conference } from 'src/app/core/models/conference.model';
import { AddConferenceComponent } from '../add-conference/add-conference.component';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-conference-detail',
  templateUrl: './conference-detail.component.html',
  styleUrls: ['./conference-detail.component.css']
})
export class ConferenceDetailComponent implements OnInit {
  isLoading = false;
  conferenceDetail: Conference;
  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private conferenceService: ConferenceService,
    private matSnackBar: MatSnackBar,
    private dialogService: DialogService,
    public commonService: CommonService

  ) { }

  _getConferenceDetail(id) {
    this.isLoading = true;
    this.conferenceService.getConferenceDetails(id).subscribe(detail => {
      this.conferenceDetail = detail;
      this.isLoading = false;
    },(error) => {
      this.isLoading = false;
      this.matSnackBar.open(error.error || error.message, null, {
          duration: AppConstants.TOAST_DISPLAY_TIME
      });
  });
  }

  editConference() {
    const dialogConfig = this.dialogService.configureDialog({
      conference: this.conferenceDetail
  });
    this.dialog.open(AddConferenceComponent, dialogConfig).afterClosed().subscribe(conferenceDetail => {
    if (conferenceDetail) {
        this.conferenceDetail = conferenceDetail;
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(urlParam => {
      this._getConferenceDetail(urlParam.get('id'));
    });
  }

}
