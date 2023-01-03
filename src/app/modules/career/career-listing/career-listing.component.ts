import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Papa } from 'ngx-papaparse';
import { Observable } from 'rxjs';
import { CareerService } from 'src/app/core/services/career.service';
import { SubscriptionService } from 'src/app/core/services/subscription.service';

import { AppConstants } from 'src/app/shared/constants/app.constants';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-career-listing',
  templateUrl: './career-listing.component.html',
  styleUrls: ['./career-listing.component.css']
})
export class CareerListingComponent implements OnInit {

  searchText: string = "";
  career = [];
  careerData = [];
  isLoading = false;
  isHidden = false;
  modal: NzModalRef;
  @ViewChild("searchBox") searchBox: ElementRef;
  @ViewChild("fileImportInput") fileImportInput: any;
  keyup$: Observable<any>;
  
  constructor(
    private careerService: CareerService, 
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private cdr: ChangeDetectorRef,
    private snackbar: MatSnackBar,
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
    this.careerService.getCareerList(filters).subscribe( response =>{
      console.log("Career Response",response);
      this.isLoading = false;
      this.isHidden = false;
      this.career = response.docs;
      this.careerData = response.docs;
      if (response?.totalDocs <= response?.limit || response?.totalDocs <= 0) {
        this._showSnackbar("No more data found")
        this.isLoading = true;
        this.isHidden = true;
      }
      this.cdr.detectChanges();
    }, error => {
      this.isLoading = false;
      this.snackbar.open(error.message, null , {duration: 3000});
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

}
