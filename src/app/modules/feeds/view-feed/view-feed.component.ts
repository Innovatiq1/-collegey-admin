import { Component, Input, OnInit} from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/core/services/common.service';

import { Feed } from 'src/app/core/models/feed.model';

@Component({
  selector: 'app-view-feed',
  templateUrl: './view-feed.component.html',
  styleUrls: ['./view-feed.component.css']
})
export class ViewFeedComponent implements OnInit {
  @Input() feedData;

  constructor(
    private modal: NzModalRef,
    public commonService: CommonService,
  ) { }

  ngOnInit(): void {
  }

  cancel() {
    this.modal.destroy();
  }

}
