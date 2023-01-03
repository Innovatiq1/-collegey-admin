import { Component, OnInit,Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/core/services/common.service';
import { NzModalRef } from 'ng-zorro-antd';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-list-project-payment',
  templateUrl: './list-project-payment.component.html',
  styleUrls: ['./list-project-payment.component.css']
})
export class ListProjectPaymentComponent implements OnInit {
  UserData: any;
  mode: String;
  id: any;
  paymentData:any;
  constructor(
    private dialogRef: MatDialogRef<ListProjectPaymentComponent>,
    private commonService: CommonService,
    private modal: NzModalRef,
    private projectService: ProjectService,
  ){ 

  }

  ngOnInit(): void {
    this.fetchPaymentData()
  }

  fetchPaymentData() {
    let obj = {id:this.id,UserData:this.UserData}
    this.projectService.getProjectPaymentData(obj).subscribe(
      (response) => {
        if (response) {
          this.paymentData = response.data?.projectPaymentUser;
        }
      },
      (err) => {
      },
      () => {
      }
    );
  }

}
