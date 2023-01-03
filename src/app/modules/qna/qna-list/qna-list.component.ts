import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { QnaService } from 'src/app/core/services/qna.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewQnaComponent } from '../view-qna/view-qna.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConstants } from 'src/app/shared/constants/app.constants';

@Component({
  selector: 'app-qna-list',
  templateUrl: './qna-list.component.html',
  styleUrls: ['./qna-list.component.css']
})
export class QnaListComponent implements OnInit {

  isLoading = false;
  qnaData: any[] = [];
  modal: NzModalRef;

  constructor(
    private qnaService: QnaService,
    private cdr: ChangeDetectorRef,
    private modalService: NzModalService,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getQnAList(params);
    });
  }

  getQnAList(filter) {
    this.qnaService.getQnAList(filter).subscribe((res) => {
      this.isLoading = false;
      this.qnaData = res.data;
      console.log("qnaData======",this.qnaData);

      let limit = filter.limit ? filter.limit : 10
      if (res.totalRecords <= limit || res.totalRecords <= 0) {
        this._showSnackbar("No more data found")
        this.isLoading = true;
      }
      this.cdr.detectChanges();
    })
  }
  _showSnackbar(message) {
    this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
  }

  deleteQuestion(questionId, status) {
    let obj = {
      queId: questionId,
      activationStatus: status
    }
    this.qnaService.deleteQnA(obj).subscribe((res) => {
      this.activatedRoute.queryParams.subscribe(params => {
        this.getQnAList(params);
      });
      this.cdr.detectChanges();
    });
  }

  viewQuestion(questionId, qna) {
    this.modal = this.modalService.create({
      nzTitle: 'Q&A',
      nzContent: ViewQnaComponent,
      nzFooter: [
        {
          label: "close",
          type: "default",
          onClick: (componentInstance) => {
            componentInstance!.cancel();
          },
        },
      ],
      nzMaskClosable: false,
      nzWidth: 900,
      nzComponentParams: {
        qnaData: qna
      },
    });
  }
}
