import { Component, OnInit } from '@angular/core';
import { UniversityPartnerService } from 'src/app/core/services/university-partner.service';
import { UniversityPartnerDetail } from 'src/app/core/models/user.model';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-university-partner-info',
  templateUrl: './university-partner-view-info.component.html',
  styleUrls: ['./university-partner-view-info.component.css']
})
export class UniversityPartnerViewInfoComponent implements OnInit {
  universityPartnerInfo: UniversityPartnerDetail;
  isLoading = false;
  
  constructor(
    private universityPartnerService: UniversityPartnerService,
    private dialog: MatDialog,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.universityPartnerService.universityPartnerInfo.subscribe(info => {
      this.universityPartnerInfo = info;
    });
  }

  async openUpdateModal() {
    const { AddUniversityPartnerComponent } = await import(
      '../../add-university-partner/add-university-partner.component'
    );
    const dialogConfig = this.dialogService.configureDialog({
      updatedPartnerInfo: this.universityPartnerInfo,
    });
    this.dialog
      .open(AddUniversityPartnerComponent, dialogConfig).afterClosed().subscribe(data=> {
        if(data) {
          window.location.reload();
        }
      });
  }

}
