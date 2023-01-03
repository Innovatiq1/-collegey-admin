import { Component, OnInit } from '@angular/core';
import { ImpactPartnersService } from 'src/app/core/services/impact-partner.service';
import { ImpactPartnerDetail } from 'src/app/core/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-impact-partner-view-info',
  templateUrl: './impact-partner-view-info.component.html',
  styleUrls: ['./impact-partner-view-info.component.css']
})

export class ImpactPartnerViewInfoComponent implements OnInit {
  impactPartnerInfo: ImpactPartnerDetail;
  isLoading = false;
  constructor(
    private impactPartnersService: ImpactPartnersService,
    private dialog: MatDialog,
    private dialogService: DialogService,
  ) { }

  async openUpdateModal() {
    const { AddImpactPartnerComponent } = await import('../../add-impact-partner/add-impact-partner.component'
    );
    const dialogConfig = this.dialogService.configureDialog({
      updatedPartnerInfo: this.impactPartnerInfo,
    });
    this.dialog
      .open(AddImpactPartnerComponent, dialogConfig).afterClosed().subscribe(data=> {
        if(data) {
          window.location.reload();
        }
      });
  }

  ngOnInit(): void {
    this.impactPartnersService.impactPartnerInfo.subscribe(info => {
      this.impactPartnerInfo = info;
    });
  }

}
