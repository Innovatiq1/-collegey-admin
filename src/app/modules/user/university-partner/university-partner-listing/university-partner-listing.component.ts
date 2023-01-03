import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule } from '@angular/router';
import { UniversityPartnerService } from 'src/app/core/services/university-partner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UniversityPartnerUser } from 'src/app/core/models/user.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-university-partner-listing',
  templateUrl: './university-partner-listing.component.html',
  styleUrls: ['./university-partner-listing.component.css']
})
export class UniversityPartnerListingComponent implements OnInit {

  isLoading = false;
  universityPartnerList: any;

  constructor(
    private universityPartnerService: UniversityPartnerService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private ref: ChangeDetectorRef
  ) { }

  getUniversityPartnerList() {
    this.isLoading = true;
    this.universityPartnerService.getUniversityPartnerList().subscribe(response => {
      this.isLoading = false;
      this.universityPartnerList = response;
      this.ref.detectChanges();
      
    }, error => {
      this.isLoading = false;
      this.snackbar.open(error.message, null , {duration: 3000});
    });

  }

  async openUniversityPartnerModal() {
    const { AddUniversityPartnerComponent } = await import(
      '../add-university-partner/add-university-partner.component'
    );
    this.dialog
      .open(AddUniversityPartnerComponent)
      .afterClosed()
      .subscribe((partner) => {
        if (partner && Object.keys(partner).length != 0) {
          this.universityPartnerList.push(partner);
        }
      });
  }

  ngOnInit(): void {
    this.getUniversityPartnerList();
  }

}

@NgModule({
  declarations: [UniversityPartnerListingComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
})
class UniversityPartnerListingModule {}
