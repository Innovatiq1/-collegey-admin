import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/core/models/menu.model';
import { StudentService } from 'src/app/core/services/student.service';
import { StudentDetail } from 'src/app/core/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-students-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  isMenuOpen = true;
  isMobile = false;
  studentInfo: StudentDetail;
  isLoading = false;
  menuitems: MenuItem[] = [
    // {
    //   id: 1,
    //   title: '',
    //   icon: 'account_circle',
    //   action: 'basic-info',
    //   open: true,
    //   children: [],
    // },
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
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,

  ) {
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  getStudentInfo(id) {
    this.isLoading = true;
    this.studentService.getStudentInfo(id).subscribe(
      (info) => {
        this.isLoading = false;
        this.studentInfo = info;
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
      // this.getStudentInfo(urlParam.get('id'));
    });
  }
}
