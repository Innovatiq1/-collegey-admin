import { Component, OnInit } from '@angular/core';
import { SchoolPartnerService } from 'src/app/core/services/school-partner.service';
import { SchoolPartnerDetail } from 'src/app/core/models/user.model';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-school-partner-view-info',
  templateUrl: './school-partner-view-info.component.html',
  styleUrls: ['./school-partner-view-info.component.css']
})
export class SchoolPartnerViewInfoComponent implements OnInit {
  schoolPartnerInfo: SchoolPartnerDetail;
  isLoading = false;
  
  constructor(
    private schoolPartnerService: SchoolPartnerService,
    private dialog: MatDialog,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.schoolPartnerService.schoolPartnerInfo.subscribe(info => {
      this.schoolPartnerInfo = info;
    });
  }

  async openUpdateModal() {
    const { AddSchoolPartnerComponent } = await import(
      '../../add-school-partner/add-school-partner.component'
    );
    const dialogConfig = this.dialogService.configureDialog({
      updatedPartnerInfo: this.schoolPartnerInfo,
    });
    this.dialog
      .open(AddSchoolPartnerComponent, dialogConfig).afterClosed().subscribe(data=> {
        if(data) {
          window.location.reload();
        }
      });
  }

}
