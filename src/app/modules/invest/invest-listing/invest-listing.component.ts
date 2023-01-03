import { Component, ElementRef, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Papa } from 'ngx-papaparse';
import { Observable } from 'rxjs';
import { InvestService } from 'src/app/core/services/invest.service';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import * as fs from 'file-saver';
import * as Excel from 'exceljs';

@Component({
  selector: 'app-invest-listing',
  templateUrl: './invest-listing.component.html',
  styleUrls: ['./invest-listing.component.css']
})
export class InvestListingComponent implements OnInit {

  searchText: string = "";
  response: any;
  investProfile = [];
  investProfileData = [];
  isLoading = false;
  modal: NzModalRef;
  @ViewChild("searchBox") searchBox: ElementRef;
  @ViewChild("fileImportInput") fileImportInput: any;
  keyup$: Observable<any>;
  
  constructor(
    private investService: InvestService, 
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private snackbar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private papa : Papa,) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getInviteeList(params);
  });
  }

  // ngAfterViewInit() {
  //   this.keyup$ = fromEvent(this.searchBox.nativeElement, "keyup");
  //   this.keyup$
  //     .pipe(
  //       map(() => {
          
  //       }),
  //       debounceTime(0)
  //     )
  //     .subscribe(() => {
  //       this.filter();
  //     });
  // }

  // filter() {
  //   this.inviteeData = JSON.parse(JSON.stringify(this.invitee));
  //   console.log("Search Text F",this.searchText,this.inviteeData,this.invitee);
  //   if (this.searchText) {
  //     this.inviteeData = this.invitee.filter((d) =>
  //       this.contains(d.email, this.searchText) || this.contains(d.firstName, this.searchText)
  //       || this.contains(d.lastName, this.searchText)
  //     );
  //   }
  // }

  getInviteeList(filters) {
    this.isLoading = true;
    this.investService.getInvestList(filters).subscribe( response =>{
      console.log("Subscription Response",response);
      this.isLoading = false;
      this.investProfile = response.docs;
      this.investProfileData = response.docs;
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
  
  search() {
    // this.inviteeData = JSON.parse(JSON.stringify(this.invitee));
    // // console.log("Search Text",this.searchText,this.inviteeData,this.invitee);
    // if (this.searchText) {
    //   this.inviteeData = this.invitee.filter(invite => { return this.contains(invite.email, this.searchText) || 
    //     this.contains(invite.firstName, this.searchText) || this.contains(invite.lastName, this.searchText)});
    // }
    // console.log("Filter Result",this.inviteeData);
  }

  contains(a: string, b: string) {
    return a.toLowerCase().indexOf(b.toLowerCase()) >= 0;
  }

  DownloadAsExcel() {

    this.investService.getInvestListForCSV().subscribe((data: any) => {
      this.response = data;
      const workbook = new Excel.Workbook();
      var worksheet = workbook.addWorksheet('sheet');

      worksheet.columns = [
        { header: "S no.", key: "s_no", width: 10 },
        { header: "Name", key: "name", width: 30 },
        { header: "Email Id", key: "email", width: 30 },
        { header: "City", key: "city", width: 30 },
        { header: "Country", key: "country", width: 30 },
        { header: "Organisation Website URL ", key: "organisation", width: 50 },
        
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
        fs.saveAs(blob, "collegeyInvestList.xlsx");
      });

    });
  }
}
