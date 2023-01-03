import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() menuClick = new EventEmitter();

  title = 'Dashboard';

  constructor(private authService: AuthService) {}

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

  ngOnInit(): void {}
}
