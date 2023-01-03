import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';
import { StaticDataService } from 'src/app/core/services/staticData.service';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/shared/components/email-state-matcher';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted: Boolean = false;
  loginForm: FormGroup;
  isLoading = false;
  matcher = new MyErrorStateMatcher();
  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private staticDataService: StaticDataService,
    private router: Router) { }


  loginUser() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const formData = this.loginForm.getRawValue();

    this.isLoading = true;
    this.authService.loginUser(formData.email.trim(), formData.password.trim(), formData.logintype.trim(), formData.type.trim())
        .subscribe(user => {
          console.log("User",user);
          this.isLoading = false;
          this.loadStaticData();
          this.authService.saveUserInfo(user);
        }, (error) => {
          console.log("User",error);
            this.isLoading = false;
            this.snackbar.open(error.message, null, {
                duration: 3000
            });
        });
        this.submitted = false;
  }

  loadStaticData() {
    this.staticDataService._getStaticDataList().subscribe(data => {
      this.staticDataService._saveStaticDataList(data);
    });
    this.staticDataService.getCountries().subscribe(data => this.staticDataService.saveCountries(data));

    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      logintype: ['admin'],
      type: ['admin']
    });
  }

}
