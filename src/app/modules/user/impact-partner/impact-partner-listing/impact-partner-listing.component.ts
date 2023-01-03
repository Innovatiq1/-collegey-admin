import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ImpactPartnersService } from 'src/app/core/services/impact-partner.service';
import { ImpactPartnerUser } from 'src/app/core/models/user.model';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-impact-partner-listing',
  templateUrl: './impact-partner-listing.component.html',
  styleUrls: ['./impact-partner-listing.component.css']
})
export class ImpactPartnerListingComponent implements OnInit {
  isLoading = false;
  impactPartnerList: ImpactPartnerUser[];

  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private impactPartnersService: ImpactPartnersService,
    private ref: ChangeDetectorRef
  ) { }

  getImpactPartnerList() {
    this.isLoading = true;
    this.impactPartnersService.getImpactPartnerList().subscribe( response =>{
      this.impactPartnerList = response.docs;
      this.ref.detectChanges();
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.snackbar.open(error.message, null , {duration: 3000});
    });
  }

  async openCreateImpactPartnerModal() {
    const { AddImpactPartnerComponent } = await import(
      '../add-impact-partner/add-impact-partner.component'
    );
    this.dialog
      .open(AddImpactPartnerComponent)
      .afterClosed()
      .subscribe((partner) => {
        if (partner && Object.keys(partner).length != 0) {
          this.impactPartnerList.push(partner);
        }
      });
  }

  ngOnInit(): void {
    this.getImpactPartnerList();
  }
}

@NgModule({
  declarations: [ImpactPartnerListingComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
})
class ImpactPartnerListingModule {}

