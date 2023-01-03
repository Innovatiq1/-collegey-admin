import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { MeetOurTeamService } from 'src/app/core/services/meet-our-team.service';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { MotTitleComponent } from '../mot-title/mot-title.component';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-mot-title-list',
  templateUrl: './mot-title-list.component.html',
  styleUrls: ['./mot-title-list.component.css']
})
export class MotTitleListComponent implements OnInit {

  isLoading = false;
  titleList: any = [];
  searchText: string = "";
  modal: NzModalRef;
  Mode = Mode;
  // @ViewChild("searchBox") searchBox: ElementRef;
  // @ViewChild("fileImportInput") fileImportInput: any;
  // keyup$: Observable<any>;
  
  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private motService: MeetOurTeamService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {      
      this.getTitleList(params);
    });
  }

  getTitleList(filter) {    
    this.motService.getTitleData(filter).subscribe(response => {
        this.titleList = response.data;
        
      this.isLoading = false;
      if (response?.totalDocs <= response?.limit || this.titleList?.length <= 0) {
        this._showSnackbar("No more data found")
        this.isLoading = true;
      }
      this.cdr.detectChanges();
    }, error => {
      this.isLoading = false;
      this.snackbar.open(error.message, null, { duration: 3000 });
    });
  }

  openModal(mode: Mode, id= null, item= null) {    
    
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Create New" : "Update ",
      nzContent: MotTitleComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.save().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this.getTitleList(params);
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
        itemData: item
      },
    });
  }
  _showSnackbar(message) {
    this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
  }



}
