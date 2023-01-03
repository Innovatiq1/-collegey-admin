import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { CareerAtService } from 'src/app/core/services/career-at.service';
import { FeedService } from 'src/app/core/services/feed.service';
import { FundInService } from 'src/app/core/services/fund-in.service';
import { InvestInService } from 'src/app/core/services/invest-in.service';
import { PartnerWithService } from 'src/app/core/services/partner-with.service';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { CareerAtComponent } from '../career-at/career-at.component';

enum Mode {
  Create = 'Create',
  Edit = 'Edit',
}

@Component({
  selector: 'app-career-at-list',
  templateUrl: './career-at-list.component.html',
  styleUrls: ['./career-at-list.component.css'],
})
export class CareerAtListComponent implements OnInit {
  modal: NzModalRef;
  Mode = Mode;
  isLoading = false;
  assignData = [];
  msg_success: boolean = false;
  msg_danger: boolean = false;
  throw_msg: any;
  show_loader: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private snackbar: MatSnackBar,
    private ref: ChangeDetectorRef,
    private router: Router,
    private careerService: CareerAtService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.getCareerData(params);
    });
  }

  openModal(mode: Mode, id = null, item = null) {
    this.modal = this.modalService.create({
      nzTitle: mode === 'Create' ? 'Create New' : 'Update ',
      nzContent: CareerAtComponent,
      nzFooter: [
        {
          label: mode === 'Create' ? 'Create' : 'Update',
          show: item ? (item.isDeleted ? false : true) : true,
          type: 'primary',
          onClick: (componentInstance) => {
            componentInstance!.save().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe((params) => {
                this.getCareerData(params);
              });
            });
          },
        },
        {
          label: 'Cancel',
          show: item ? (item.isDeleted ? false : true) : true,
          type: 'default',
          onClick: (componentInstance) => {
            componentInstance!.cancel();
          },
        },
        {
          label: 'close',
          show: item ? (item.isDeleted ? true : false) : false,
          type: 'default',
          onClick: (componentInstance) => {
            componentInstance!.cancel();
          },
        },
      ],
      nzMaskClosable: false,
      nzWidth: 900,
      nzComponentParams: {
        mode: mode,
        id: id,
        itemData: item,
      },
    });
  }

  getCareerData(params: any) {
    this.isLoading = true;
    this.show_loader = true;
    this.careerService.getAllData(params).subscribe(
      (response) => {
        this.show_loader = false;
        this.isLoading = false;
        this.assignData = response?.data;
        this.ref.detectChanges();
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }
}
