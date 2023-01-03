import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalRef,NzModalService } from 'ng-zorro-antd';
import { FeedService } from 'src/app/core/services/feed.service';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { CollegeyQuestionComponent } from '../collegey-question/collegey-question.component';


enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-collegey-question-list',
  templateUrl: './collegey-question-list.component.html',
  styleUrls: ['./collegey-question-list.component.css']
})
export class CollegeyQuestionListComponent implements OnInit {

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
    private ref: ChangeDetectorRef,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {      
      this.getCollegeyQuestionData(params);
    });
  }

  openModal(mode: Mode, id= null, item= null) {
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Create New" : "Update ",
      nzContent: CollegeyQuestionComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.save().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this.getCollegeyQuestionData(params);
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

  getCollegeyQuestionData(filters) {
    this.isLoading   = true;
    this.show_loader = true;
    this.feedService.getQuestionData(filters).subscribe( response =>{
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

  answerModal(id:any){
    this.router.navigate(['/feeds/collegey-answer-list/'+ id]);
  }

}
