import { Component, ElementRef, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { Team } from 'src/app/core/models/team.model';
import { TeamService } from 'src/app/core/services/team.service';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { AddBoardofAdvisorsComponent } from '../add-boardof-advisors/add-boardof-advisors.component';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-boardof-advisors-listing',
  templateUrl: './boardof-advisors-listing.component.html',
  styleUrls: ['./boardof-advisors-listing.component.css']
})
export class BoardofAdvisorsListingComponent implements OnInit {

  isLoading = false;
  teamlist: Team[] = [];
  searchText: string = "";
  modal: NzModalRef;
  Mode = Mode;
  @ViewChild("searchBox") searchBox: ElementRef;
  @ViewChild("fileImportInput") fileImportInput: any;
  keyup$: Observable<any>;

  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private teamService: TeamService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getBoardofAdvisorsList(params);
    });
  }
  getBoardofAdvisorsList(filter) {
    this.isLoading = true;
    this.teamService.getBoardofAdvisorsList(filter).subscribe( response =>{
      this.isLoading = false;
      this.teamlist = response.data.data;
      let limit = filter.limit ? filter.limit : 10
      if (response.totalRecords <= limit || response.totalRecords <= 0) {
        this._showSnackbar("No more data found")
        this.isLoading = true;
      }
      this.cdr.detectChanges();
    }, error => {
      this.isLoading = false;
      this.snackbar.open(error.message, null , {duration: 3000});
    });
  }

  _showSnackbar(message) {
    this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
  }

  openModal(mode: Mode, id = null, item = null) {
    console.log("Clicked")
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Create Board of Advisors" : "Update Board of Advisors",
      nzContent: AddBoardofAdvisorsComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.onSubmitForm().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this.getBoardofAdvisorsList(params);
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
        team:item
      },
    });
  }


  activationBoardofAdvisors(listid:any,status:any)
  {
      var mylist = {id:listid,status:status};
      this.teamService.updateBoardofAdvisorsStatus(mylist).subscribe(
        (response) => {
          Swal.fire({
            title: 'Successful',
            text: response.message,
            icon: 'success',
          });
          this.activatedRoute.queryParams.subscribe(params => {
            this.getBoardofAdvisorsList(params);
          });
        }
      );
  }


}
