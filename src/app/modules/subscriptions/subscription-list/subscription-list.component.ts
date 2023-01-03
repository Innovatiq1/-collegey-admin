import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Papa } from 'ngx-papaparse';
import { Observable } from 'rxjs';
import { InviteeService } from 'src/app/core/services/invitee.service';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { AddInviteComponent } from '../../emailinvite/add-invite/add-invite.component';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent implements OnInit {

  searchText: string = "";
  subscription = [];
  subscriptionData = [];
  isLoading = false;
  modal: NzModalRef;
  @ViewChild("searchBox") searchBox: ElementRef;
  @ViewChild("fileImportInput") fileImportInput: any;
  keyup$: Observable<any>;
  
  constructor(
    private subscriptionService: SubscriptionService, 
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
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
    this.subscriptionService.getSubscriptionList(filters).subscribe( response =>{
      console.log("Subscription Response",response);
      this.isLoading = false;
      this.subscription = response.docs;
      this.subscriptionData = response.docs;
      if(response.totalDocs - (+filters.limit) < -11) {
        this._showSnackbar("No more data found")
      }
    }, error => {
      this.isLoading = false;
      // this.snackbar.open(error.message, null , {duration: 3000});
    });
  }
  _showSnackbar(message) {
    // this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
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
