import { Component, OnInit } from '@angular/core';
import { Webinar } from 'src/app/core/models/webinar.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from 'src/app/core/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { WebinarService } from 'src/app/core/services/webinar.service';
import { AddWebinarComponent } from './add-webinar/add-webinar.component';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/shared/constants/app.constants';

@Component({
  selector: 'app-webinars',
  templateUrl: './webinars.component.html',
  styleUrls: ['./webinars.component.css']
})
export class WebinarsComponent implements OnInit {
  isLoading = true;
  webinarList: Webinar[] = [];
  constructor(
    private snackBar: MatSnackBar,
    private webinarService: WebinarService,
    private dialogService: DialogService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,


  ) { }

  _getWebinars(filter) {
        this.isLoading = true;
        this.webinarService.getWebinarList(filter).subscribe(webinars => {
            this.isLoading = false;
            this.webinarList = webinars.docs;
            if(webinars.totalDocs - (+filter.limit) < -11) {
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

  addNewWebinar() {
    const dialogConfig = this.dialogService.configureDialog(null);
    this.dialog.open(AddWebinarComponent, dialogConfig).afterClosed().subscribe(response => {
      if(response) {
        this.webinarList.push(response);
      }
    })
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this._getWebinars(params);
  });

}
}
