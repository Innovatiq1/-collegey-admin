import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NewsLetterService } from 'src/app/core/services/news-letter.service';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import * as fs from 'file-saver';
import * as Excel from 'exceljs';

@Component({
  selector: 'app-newsletter-list',
  templateUrl: './newsletter-list.component.html',
  styleUrls: ['./newsletter-list.component.css']
})
export class NewsletterListComponent implements OnInit {
  isLoading = false;
  assignData = [];
  msg_success: boolean = false;
  msg_danger: boolean = false;
  throw_msg:any;
  show_loader: boolean = false;
  isHidden = false;

    //group pagination
    currentPage: number = 1;
    currentLimit: number = 10;
    totalRecord: number = 0;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private ref: ChangeDetectorRef,
    private letterService: NewsLetterService,

  ) { }

  ngOnInit(): void {
    this.newsLetter();
  }
  _showSnackbar(message) {
    this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
  }

  newsLetter() {    
    var obj={
      limit: this.currentLimit,
      page:this.currentPage,
    }
    this.isLoading   = true;
   this. getLetterData(obj);
  }

  getLetterData(filters) {    
    this.isLoading   = true;
    this.show_loader = true;
    this.letterService.getNewsLetterData(filters).subscribe( response =>{
      this.show_loader = false;
      this.isLoading   = false; 
      this.assignData  = response?.data;
      this.totalRecord = response?.totalrecord;
      this.ref.detectChanges();
      if(response?.data?.totalDocs - (+filters.limit) < -11) {
        this._showSnackbar("No more data found")
      }
    }, error => {
      this.isLoading = false;
    }); 
  }

  pagination(){  
    console.log('call');
    
    var skip =this.currentPage*this.currentLimit
    if(skip< this.totalRecord){
      this.currentLimit=this.currentLimit+5
      this.newsLetter();
    }
    else{
      this.isHidden=true
    }
  }

  response:any

  DownloadAsExcel(){
    this.letterService.getCSVlist().subscribe( (res: any) =>{
      var data= res.data
      this.response =data;
      const workbook = new Excel.Workbook();
      var worksheet = workbook.addWorksheet('sheet');

      worksheet.columns = [
        { header: "S no.", key: "s_no", width: 10 },
        { header: "Email Id", key: "email", width: 30 },
        { header: "Create Time", key: "createdAt", width: 50 },
      ];
      // Looping through User data
      let counter = 1;
      data.forEach((user) => {
        user['s_no']=counter;
        worksheet.addRow(user); // Add data in worksheet
        counter++;
      });
      var buff = workbook.xlsx.writeBuffer().then(function (data) {
        var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, "News_Letter.xlsx");
      });
      
    })
  }

}
