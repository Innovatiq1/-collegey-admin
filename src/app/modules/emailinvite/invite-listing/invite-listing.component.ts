import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Invitee } from 'src/app/core/models/invitee.model';
import { InviteeService } from 'src/app/core/services/invitee.service';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { AddInviteComponent } from '../add-invite/add-invite.component';
import referralCodeGenerator from 'referral-code-generator'
import { Papa } from 'ngx-papaparse';
import {MatSnackBar} from '@angular/material/snack-bar';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-invite-listing',
  templateUrl: './invite-listing.component.html',
  styleUrls: ['./invite-listing.component.css']
})
export class InviteListingComponent implements OnInit {

  searchText: string = "";
  invitee = [];
  inviteeData = [];
  isLoading = false;
  isHidden = false;
  modal: NzModalRef;
  Mode = Mode;
  invite_formData:any;
  @ViewChild("searchBox") searchBox: ElementRef;
  @ViewChild("fileImportInput") fileImportInput: any;
  keyup$: Observable<any>;
  
  msg_success: boolean = false;
  msg_danger: boolean = false;
  throw_msg:any;

  show_loader:boolean = false

  constructor(
    private inviteeService: InviteeService, 
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private cdr: ChangeDetectorRef,
    private papa : Papa,
    private snackbar: MatSnackBar,
    ) { }

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
    this.inviteeService.getInviteeList(filters).subscribe( response =>{
      this.invite_formData = response;
      this.isLoading = false;
      this.isHidden = false;
      this.invitee = response.docs;
      this.inviteeData = response.docs;
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
    this.inviteeData = JSON.parse(JSON.stringify(this.invitee));
    // console.log("Search Text",this.searchText,this.inviteeData,this.invitee);
    if (this.searchText) {
      this.inviteeData = this.invitee.filter(invite => { return this.contains(invite.email, this.searchText) || 
        this.contains(invite.firstName, this.searchText) || this.contains(invite.lastName, this.searchText)});
    }
    // console.log("Filter Result",this.inviteeData);
  }

  contains(a: string, b: string) {
    return a.toLowerCase().indexOf(b.toLowerCase()) >= 0;
  }

  openModal(mode: Mode, id = null, item = null) {
    this.modal = this.modalService.create({
      nzTitle: "Create Invite",
      nzContent: AddInviteComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.save().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this.getInviteeList(params);
            });
            });
          },
        },
        {
          label: "Cancel",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "default",
          onClick: (componentInstance) => {
            componentInstance!.cancel();
          },
        },
        {
          label: "close",
          show: item ? (item.isDeleted ? true : false) : false,
          type: "default",
          onClick: (componentInstance) => {
            componentInstance!.cancel();
          },
        },
      ],
      nzMaskClosable: false,
      nzComponentParams: {
        mode: mode,
        id: id,
      },
    });
  }

  sendActivationEmail(id,item){
    this.show_loader = true;
    let activation_code = referralCodeGenerator.custom('uppercase', 6, 2, item.email.split('@')[0]+item.firstName+item.lastName);
    this.inviteeService.sendActivationCodeEmail({id,activation_code}).subscribe( response =>{
      this.show_loader = false;
      this.isLoading   = false;
      this.msg_success = true;
      this.msg_danger  = false;
      setTimeout(()=>{                            
        this.msg_success = false;
        this.cdr.detectChanges();
      },3000);
      this.activatedRoute.queryParams.subscribe(params => {
        this.getInviteeList(params);
      });
    }, error => { 
      this.throw_msg   = error.message;
      this.msg_danger  = true;
      this.msg_success = false;
      setTimeout(()=>{                            
        //this.msg_danger = false;
      },5000);
      //this.snackbar.open(error.message, null , {duration: 3000});
    });
  }
  
  fileChangeListener($event: any,item:any): void {
    const files = $event.srcElement.files;
    this.papa
      .parse(files[0],{
        header:true,
        skipEmptyLines:true,
        complete : (results)=>{
          console.log("File read result",results);
          let finalInsertData =  results.data.map((dat,idx)=>{
            let obj = {
              "firstName":dat.firstName,
              "lastName":dat.lastName,
              "email":dat.email,
              "cellNumber":dat.cellNumber,
              "type":dat.type,
              "activation_code":referralCodeGenerator.custom('uppercase', 6, 2, dat.email.split('@')[0]+dat.firstName+dat.lastName),
              "isActive":false,
              "status":"pending"
            }
            return obj;
          })
          let valid = true;
          finalInsertData.forEach((dat,idx)=>{
            if(dat.organization !== item.organization){
              valid = false;
            }
          })
          if(valid){
            this.inviteeService
              .createBulkInvitee(finalInsertData)
              .subscribe(
                (res) => {
                  console.log("Data Inserted", res);
                },
                (err) => {
                  debugger;
                  console.log("Error in inserting", err);
                },
                () => {
                }
              );
          }
          else{
          }
          
        },
        error : (error)=>{
          console.log("File read error",error);
        }
      })
  }

  delete(id:any){   
    this.inviteeService.deleteInvitee(id).subscribe( response =>{
      this.getInviteeList({})
    })
  }

  active(id:any){
    var obj = {
      id:id
    }
    this.inviteeService.activeInvitee(obj).subscribe( response =>{
      this.getInviteeList({})
    })

  }

}
