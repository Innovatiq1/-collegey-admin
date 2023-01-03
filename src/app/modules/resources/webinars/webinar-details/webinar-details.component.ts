import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebinarService } from 'src/app/core/services/webinar.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from 'src/app/core/services/dialog.service';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { Webinar } from 'src/app/core/models/webinar.model';
import { AddWebinarComponent } from '../add-webinar/add-webinar.component';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-webinar-details',
  templateUrl: './webinar-details.component.html',
  styleUrls: ['./webinar-details.component.css']
})
export class WebinarDetailsComponent implements OnInit {
  isLoading = false;
  webinarDetail: Webinar;
  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private webinarService: WebinarService,
    private matSnackBar: MatSnackBar,
    private dialogService: DialogService,
    public commonService: CommonService

  ) { }

  _getWebinarDetail(id) {
    this.isLoading = true;
    this.webinarService.getWebinarDetails(id).subscribe(detail => {
      this.webinarDetail = detail;
      this.isLoading = false;
    },(error) => {
      this.isLoading = false;
      this.matSnackBar.open(error.error || error.message, null, {
          duration: AppConstants.TOAST_DISPLAY_TIME
      });
  });
  }

  editWebinar() {
    const dialogConfig = this.dialogService.configureDialog({
      webinar: this.webinarDetail
  });
    this.dialog.open(AddWebinarComponent, dialogConfig).afterClosed().subscribe(webinarDetail => {
      if (webinarDetail) {
          this.webinarDetail = webinarDetail;
      }
  });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(urlParam => {
      this._getWebinarDetail(urlParam.get('id'));
  });
  }

}
