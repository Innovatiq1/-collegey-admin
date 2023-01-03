import { Component, OnInit } from '@angular/core';
import { UniversityPartnerService } from 'src/app/core/services/university-partner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'src/app/core/models/menu.model';
import { UniversityPartnerDetail } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-university-partner-details',
  templateUrl: './university-partner-details.component.html',
  styleUrls: ['./university-partner-details.component.css']
})
export class UniversityPartnerDetailsComponent implements OnInit {
  isMenuOpen = true;
  isMobile = false;
  isLoading = false;
  universityPartnerInfo: UniversityPartnerDetail;
  constructor(
    private universityPartnersService: UniversityPartnerService,
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
    // {
    //   id: 2,
    //   title: 'Profile',
    //   icon: 'account_circle',
    //   action: 'profile',
    //   open: true,
    //   children: [],
    // },
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  getUniversityPartnerInfo(id) {
    this.isLoading = true;
    this.universityPartnersService.getUniversityPartnerInfo(id).subscribe(info => {
      this.isLoading = false;
      this.universityPartnerInfo = info;
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
      this.getUniversityPartnerInfo(urlParam.get('id'));
    });
  }

}
