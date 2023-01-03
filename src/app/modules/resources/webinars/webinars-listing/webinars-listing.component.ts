import { Component, OnInit, Input, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { Webinar } from 'src/app/core/models/webinar.model';
import { DialogService } from 'src/app/core/services/dialog.service';
import { WebinarService } from 'src/app/core/services/webinar.service';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { AddWebinarComponent } from '../add-webinar/add-webinar.component';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from 'src/app/core/services/common.service';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-webinars-listing',
  templateUrl: './webinars-listing.component.html',
  styleUrls: ['./webinars-listing.component.css']
})
export class WebinarsListingComponent implements OnInit {
  
  isLoading = true;
  webinarList: Webinar[] = [];
  webinarUrlList: any[] = [];
  searchText: string = "";
  modal: NzModalRef;
  Mode = Mode;
  @ViewChild("searchBox") searchBox: ElementRef;
  @ViewChild("fileImportInput") fileImportInput: any;
  keyup$: Observable<any>;
  
  constructor(
    private snackBar: MatSnackBar,
    private webinarService: WebinarService,
    private dialogService: DialogService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private modalService: NzModalService,
    private domSanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    public commonService: CommonService
  ) { }

  _getWebinars(filter) {
        this.webinarService.getWebinarList(filter).subscribe(webinars => {
            this.isLoading = false;
            this.webinarList = webinars.docs;

            for (let index = 0; index < this.webinarList.length; index++) {
              let singleUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.convertToEmbedCode(this.webinarList[index].video_url));
              this.webinarUrlList.push(singleUrl);
            }
            
            if (webinars?.totalDocs <= webinars?.limit || webinars?.totalDocs <= 0) {
              this._showSnackbar("No more data found")
              this.isLoading = true;
            }   
            this.cdr.detectChanges();
        }, (error) => {
            this.isLoading = false;
            this.snackBar.open(error.message || error.error, null);
        });
  }

  convertToEmbedCode(url) {
    const videoId = this.getYoutubeUrl(url);
    return `https://www.youtube.com/embed/${videoId}`;
  }

  getYoutubeUrl(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
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
      this.cdr.detectChanges();
    });
  }

  deleteVlog(vlogId: any) {
    this.webinarService.deleteWebinar(vlogId).subscribe((res)=> {
      this.activatedRoute.queryParams.subscribe(params => {
        this._getWebinars(params);
        this.cdr.detectChanges();
      });
    })
  }

  openModal(mode: Mode, id = null, item = null) {
    console.log("Clicked")
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Create Vlog" : "Update Vlog",
      nzContent: AddWebinarComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.onSubmitForm().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this._getWebinars(params);
                this.cdr.detectChanges();
            });
            });
          },
        },
        {
          label: "Cancel",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "default",
          onClick: (componentInstance) => {
            componentInstance!.cancel();
          },
        },
        {
          label: "close",
          show: item ? (item.isDeleted ? true : false) : false,
          type: "default",
          onClick: (componentInstance) => {
            componentInstance!.cancel();
          },
        },
      ],
      nzMaskClosable: false,
      nzWidth:900,
      nzComponentParams: {
        mode: mode,
        id: id,
        webinar:item
      },
    });
  }
}
