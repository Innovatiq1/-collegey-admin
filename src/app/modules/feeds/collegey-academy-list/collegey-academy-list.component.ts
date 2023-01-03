import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { FeedService } from 'src/app/core/services/feed.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { CollegeyAcademyComponent } from '../collegey-academy/collegey-academy.component';
import { AppConstants } from 'src/app/shared/constants/app.constants';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-collegey-academy-list',
  templateUrl: './collegey-academy-list.component.html',
  styleUrls: ['./collegey-academy-list.component.css']
})

export class CollegeyAcademyListComponent implements OnInit {

  modal: NzModalRef;
  Mode = Mode;
  isLoading = false;
  assignData = [];
  msg_success: boolean = false;
  msg_danger: boolean = false;
  throw_msg:any;
  show_loader: boolean = false;

  constructor(
    private feedService: FeedService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private snackbar: MatSnackBar,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {      
      this.getAcademicData(params);
    });
  }

  openModal(mode: Mode, id= null, item= null) {    
    
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Create New" : "Update ",
      nzContent: CollegeyAcademyComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.save().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this.getAcademicData(params);
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

  getAcademicData(filters) {
    this.isLoading   = true;
    this.show_loader = true;
    this.feedService.getAcademicBoxData(filters).subscribe( response =>{
      this.show_loader = false;
      this.isLoading   = false; 
      this.assignData  = response?.data;
      this.ref.detectChanges();
      if(response?.data?.totalDocs - (+filters.limit) < -11) {
        this._showSnackbar("No more data found")
      }
    }, error => {
      this.isLoading = false;
    }); 
  }

}
