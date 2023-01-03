import { ChangeDetectorRef,Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalRef,NzModalService } from 'ng-zorro-antd';
import { FeedService } from 'src/app/core/services/feed.service';
import { InvestInService } from 'src/app/core/services/invest-in.service';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { InvestInComponent } from '../invest-in/invest-in.component';



enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}
@Component({
  selector: 'app-invest-in-collegey-list',
  templateUrl: './invest-in-collegey-list.component.html',
  styleUrls: ['./invest-in-collegey-list.component.css']
})
export class InvestInCollegeyListComponent implements OnInit {

  
  modal: NzModalRef;
  Mode = Mode;
  isLoading = false;
  assignData = [];
  msg_success: boolean = false;
  msg_danger: boolean = false;
  throw_msg:any;
  show_loader: boolean = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private snackbar: MatSnackBar,
    private ref: ChangeDetectorRef,
    private router:Router,
    private invest:InvestInService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {      
      this.getInvestInData(params);
    });
  }

  openModal(mode: Mode, id= null, item= null) {
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Create New" : "Update ",
      nzContent: InvestInComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.save().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this.getInvestInData(params);
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

  getInvestInData(params:any) {
    this.isLoading   = true;
    this.show_loader = true;
    this.invest.getAllData(params).subscribe( response =>{
      this.show_loader = false;
      this.isLoading   = false; 
      this.assignData  = response?.data;
      this.ref.detectChanges();
    }, error => {
      this.isLoading = false;
    }); 
  }


}
