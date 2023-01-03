import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NB_WINDOW } from '@nebular/theme';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  hideMenuOnClick: boolean = false;

  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Log out' , click : 'logOut()'} ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService,
              private authService: AuthService,
              private nbMenuService: NbMenuService, @Inject(NB_WINDOW) private window) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    const { xl } = this.breakpointService.getBreakpointsMap();
    const {is}   = this.breakpointService.getBreakpointsMap();

    this.themeService.onMediaQueryChange()
    .pipe(
      map(([, currentBreakpoint]) => currentBreakpoint),
      takeUntil(this.destroy$),
    )
    .subscribe(currentBreakpoint => {
      this.userPictureOnly = currentBreakpoint.width < xl;
      this.hideMenuOnClick = currentBreakpoint.width <= is;
    });

    this.menuService.onItemClick().subscribe(() => {
      if (this.hideMenuOnClick) {
        this.sidebarService.collapse('menu-sidebar');
      }
    });

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

      this.user = this.authService.getUserInfo();
      this.user = this.user.user;
      console.log("User Auth",this.user);

      this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'logoutMenu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if(title === 'Log out'){
          this.logOut();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  logOut() {
    Swal.fire({
      title: 'Please wait...',
      icon: 'info',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    const token = this.authService.getAccessToken();
    localStorage.removeItem('userId');
    localStorage.removeItem('user_data');
    localStorage.removeItem('countries_data');
    localStorage.removeItem('phone_code');
    localStorage.removeItem('static_data');
    window.location.reload();




  }
}
