import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/core/models/menu.model';
import { ImpactPartnersService } from 'src/app/core/services/impact-partner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImpactPartnerDetail } from 'src/app/core/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-impact-partner-details',
  templateUrl: './impact-partner-details.component.html',
  styleUrls: ['./impact-partner-details.component.css']
})
export class ImpactPartnerDetailsComponent implements OnInit {
  isMenuOpen = true;
  isMobile = false;
  isLoading = false;
  impactPartnerInfo: ImpactPartnerDetail;
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
    // {
    //   id: 3,
    //   title: 'Projects',
    //   icon: 'account_circle',
    //   action: 'projects',
    //   open: true,
    //   children: [],
    // },
  ];
  constructor(
    private impactPartnersService: ImpactPartnersService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  getImpactPartnerInfo(id) {
    this.isLoading = true;
    this.impactPartnersService.getImpactPartnerInfo(id).subscribe(info => {
      this.isLoading = false;
      this.impactPartnerInfo = info;
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
      this.getImpactPartnerInfo(urlParam.get('id'));
    });
  }

}
