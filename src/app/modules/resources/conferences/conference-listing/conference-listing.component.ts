import { Component, OnInit, NgModule, ElementRef, ViewChild,ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConferenceService } from 'src/app/core/services/conference.service';
import { Conference } from 'src/app/core/models/conference.model';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { AddConferenceComponent } from '../add-conference/add-conference.component';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-conference-listing',
  templateUrl: './conference-listing.component.html',
  styleUrls: ['./conference-listing.component.css']
})
export class ConferenceListingComponent implements OnInit {
  isLoading = false;
  conferenceList: Conference[] = [];
  searchText: string = "";
  modal: NzModalRef;
  Mode = Mode;
  @ViewChild("searchBox") searchBox: ElementRef;
  @ViewChild("fileImportInput") fileImportInput: any;
  keyup$: Observable<any>;
  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private conferenceService: ConferenceService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private ref: ChangeDetectorRef,
  ) { }

  getConferenceList(filter) {
    this.isLoading = true;
    this.conferenceService.getConferenceList(filter).subscribe( response =>{
      this.isLoading = false;
      this.conferenceList = response.docs;
      if (response?.totalDocs <= response?.limit || response?.totalDocs <= 0) {        
        this._showSnackbar("No more data found")
        this.isLoading = true;
      }
      this.ref.detectChanges();
    }, error => {
      this.isLoading = false;
      this.snackbar.open(error.message, null , {duration: 3000});
    });
  }

  _showSnackbar(message) {
    this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
  }

  // async openCreateConferenceModal() {
  //   const { AddConferenceComponent } = await import(
  //     '../add-conference/add-conference.component'
  //   );
  //   this.dialog
  //     .open(AddConferenceComponent)
  //     .afterClosed()
  //     .subscribe((conference) => {
  //       if (conference && Object.keys(conference).length != 0) {
  //         this.conferenceList.push(conference);
  //       }
  //     });
  // }
  

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getConferenceList(params);
    });
  }

  openModal(mode: Mode, id = null, item = null) {
    console.log("Clicked")
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Create Conference" : "Update Conference",
      nzContent: AddConferenceComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.onSubmitForm().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this.getConferenceList(params);
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
        conference:item
      },
    });
  }
}

