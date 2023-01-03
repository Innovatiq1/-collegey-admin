import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SchoolPartnerUser } from 'src/app/core/models/user.model';
import { SchoolPartnerService } from 'src/app/core/services/school-partner.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-school-partner-listing',
  templateUrl: './school-partner-listing.component.html',
  styleUrls: ['./school-partner-listing.component.css']
})
export class SchoolPartnerListingComponent implements OnInit {
  isLoading = false;
  schoolPartnerList: any;

  constructor(
    private schoolPartnerService: SchoolPartnerService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private ref: ChangeDetectorRef
  ) { }

  getSchoolPartnerList() {
    this.isLoading = true;
    this.schoolPartnerService.getSchoolPartnerList().subscribe(response => {

      this.schoolPartnerList = response;
      this.ref.detectChanges();
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.snackbar.open(error.message, null , {duration: 3000});
    });

  }

  async openSchoolPartnerModal() {
    const { AddSchoolPartnerComponent } = await import(
      '../add-school-partner/add-school-partner.component'
    );
    this.dialog
      .open(AddSchoolPartnerComponent)
      .afterClosed()
      .subscribe((partner) => {
        if (partner && Object.keys(partner).length != 0) {
          this.schoolPartnerList.push(partner);
        }
      });
  }

  ngOnInit(): void {
    this.getSchoolPartnerList();
  }

}

@NgModule({
  declarations: [SchoolPartnerListingComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
})
class SchoolListingModule {}