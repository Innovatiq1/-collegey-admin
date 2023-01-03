import { Component, OnInit } from '@angular/core';
import { STUDENT_PORTFOLIO_INFO_QUESTIONS } from 'src/app/shared/constants/data/common.data';

@Component({
  selector: 'app-student-portfolio-info',
  templateUrl: './student-portfolio-info.component.html',
  styleUrls: ['./student-portfolio-info.component.css']
})
export class StudentPortfolioInfoComponent implements OnInit {
  panelOpenState = false;
  doneBigProject: string;
  writingSample: string;
  portfolioInfoQuestion = STUDENT_PORTFOLIO_INFO_QUESTIONS;


  fileData: File = null;
  constructor() { }


  fileProgress(fileInput: any) {
    this.fileData = (fileInput.target.files[0] as File);
  }

  ngOnInit(): void {
  }

}
