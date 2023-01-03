import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'src/app/core/models/menu.model';
import { SchoolPartnerDetail } from 'src/app/core/models/user.model';
import { SchoolPartnerService } from 'src/app/core/services/school-partner.service';


@Component({
  selector: 'app-school-partner-details',
  templateUrl: './school-partner-details.component.html',
  styleUrls: ['./school-partner-details.component.css']
})
export class SchoolPartnerDetailsComponent implements OnInit {

  isMenuOpen = true;
  isMobile = false;
  isLoading = false;
  schoolPartnerInfo: SchoolPartnerDetail;
  constructor(
    private schoolPartnersService: SchoolPartnerService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }

  menuItems: MenuItem[] = [
    {
      id: 1,
      title: 'Basic Info',
      icon: 'account_circle',
      action: 'basic-info',
      open: true,
      children: [],
    },
    {
      id: 2,
      title: 'Profile',
      icon: 'account_circle',
      action: 'profile',
      open: true,
      children: [],
    },
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  getSchoolPartnerInfo(id) {
    this.isLoading = true;
    this.schoolPartnersService.getSchoolPartnerInfo(id).subscribe(info => {
      this.isLoading = false;
      this.schoolPartnerInfo = info;
    },
      (error) => {
        this.isLoading = false;
        this.snackbar.open(error.message, null, { duration: 3000 });
      }
      );
  }

  ngOnInit(): void {
    if (window.screen.width <= 768) {
      this.isMobile = true;
    }
    window.onresize = () => (this.isMobile = window.innerWidth <= 768);

    this.activatedRoute.paramMap.subscribe((urlParam) => {
      localStorage.setItem('userId' , urlParam.get('id'));
      this.getSchoolPartnerInfo(urlParam.get('id'));
    });
  }

}
