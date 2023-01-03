import { Component, ElementRef, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Papa } from 'ngx-papaparse';
import { Observable } from 'rxjs';
import { InvestService } from 'src/app/core/services/invest.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { CommonService } from 'src/app/core/services/common.service';
import * as fs from 'file-saver';
import * as Excel from 'exceljs';

@Component({
  selector: 'app-collegey-careers',
  templateUrl: './collegey-careers.component.html',
  styleUrls: ['./collegey-careers.component.css']
})
export class CollegeyCareersComponent implements OnInit {
  
  response: any;
  isLoading = false;
  modal: NzModalRef;
  @ViewChild("searchBox") searchBox: ElementRef;
  @ViewChild("fileImportInput") fileImportInput: any;
  keyup$: Observable<any>;
  fundResponse: any;

  constructor(
    public commonService: CommonService,
    private investService: InvestService, 
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private cdr: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private papa : Papa,) { }

    ngOnInit() {
      this.activatedRoute.queryParams.subscribe(params => {
        this.getCollegeyPartnerList(params);
    });
    }
    getCollegeyPartnerList(filters) {
      this.isLoading = true;
      this.investService.getCollegeyCareerList(filters).subscribe( response =>{
        this.isLoading = false;
        this.fundResponse = response?.docs;
        if (response?.totalDocs <= response?.limit || response?.totalDocs <= 0) {
          this._showSnackbar("No more data found")
          this.isLoading = true;
        }
        this.cdr.detectChanges();
      }, error => {
        this.isLoading = false;
        // this.snackbar.open(error.message, null , {duration: 3000});
      });
    }
    _showSnackbar(message) {
      this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
    }

    DownloadAsExcel() {

      this.investService.getCollegeyCareerListForCSV().subscribe((data: any) => {
        this.response = data;
        const workbook = new Excel.Workbook();
        var worksheet = workbook.addWorksheet('sheet');
  
        worksheet.columns = [
          { header: "S no.", key: "s_no", width: 10 },
          { header: "Name", key: "name", width: 30 },
          { header: "Email Id", key: "emailId", width: 30 },
          { header: "Country Code", key: "countryCode", width: 20 },
          { header: "Phone Number", key: "cellNumber", width: 30 },
          { header: "City", key: "city", width: 20 },
          { header: "Country", key: "country", width: 20 },
          { header: "Expertise", key: "expertise", width: 30 },
          { header: "Work Title", key: "workTitle", width: 20 },
          { header: "Outcome", key: "outcome", width: 30 },
          { header: "Linkedin Id", key: "linkedinId", width: 30 },
          { header: "Resume", key: "resume", width: 30 },          
        ];
        // Looping through User data
        let counter = 1;
        data.forEach((user) => {
          const URLDISPLAYNAME='downlod';
          user['s_no']=counter;
          user['resume']=this.commonService.imagePathS3(user?.resume);
          worksheet.addRow(user); // Add data in worksheet
          counter++;
        });
        var buff = workbook.xlsx.writeBuffer().then(function (data) {
          var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          fs.saveAs(blob, "collegeyCareerList.xlsx");
        });
  
      });
    }

}
