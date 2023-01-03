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
import { Qna } from 'src/app/core/models/qna.model';

@Component({
  selector: 'app-view-qna',
  templateUrl: './view-qna.component.html',
  styleUrls: ['./view-qna.component.css']
})
export class ViewQnaComponent implements OnInit {
  @Input() qnaData;

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ViewQnaComponent>,
    ) { }

  ngOnInit(): void {
  }

  cancel() {
    this.modal.destroy();
  }

}
