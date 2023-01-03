import { Component, OnInit, NgModule, ElementRef, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';  
import { ActivatedRoute, Router } from '@angular/router'; 
import { fromEvent, Observable } from 'rxjs'; 
import { Papa } from 'ngx-papaparse';   
// Load Services
import { MentorService } from 'src/app/core/services/mentor/mentor.service'; 
// Componets
import { AddCollegeyopportunitiesComponent } from '../add-collegeyopportunities/add-collegeyopportunities.component';
import Swal from 'sweetalert2';


enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}


@Component({
  selector: 'app-collegey-opportunities',
  templateUrl: './collegey-opportunities.component.html',
  styleUrls: ['./collegey-opportunities.component.css']
})
export class CollegeyOpportunitiesComponent implements OnInit {

  searchText: string = "";
  resourceData = [];
  isLoading = false; 
  show_loader: boolean = false;
  modal: NzModalRef;
  Mode = Mode;
  resource_formData:any;

  @ViewChild("searchBox") searchBox: ElementRef;
  @ViewChild("fileImportInput") fileImportInput: any;
  keyup$: Observable<any>;
  
  msg_success: boolean = false;
  msg_danger: boolean = false;
  throw_msg:any;
  
  constructor(
    private mentorService: MentorService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private snackbar: MatSnackBar,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getCollegeyOpportunitiesList(params);
    });
  }

  getCollegeyOpportunitiesList(filters) {
    this.show_loader = true;
    this.mentorService.getCollegeyOpportunitiesList(filters).subscribe( response =>{
      this.resource_formData = response?.data;
     // console.log(" resource_formData ",this.resource_formData);
      if(this.resource_formData){
        this.show_loader       = false;
        this.isLoading         = false;
        this.resourceData      = response?.data?.docs;
        if (response?.data?.totalDocs <= response?.data?.limit || response?.data?.totalDocs <= 0) {
          this._showSnackbar("No more data found")
          this.isLoading = true;
        }
        this.ref.detectChanges();
      }else{
        this.isLoading = false;
        this.show_loader = false; 
        Swal.fire({ 
          title: 'No Record Founds',
          icon: 'error',
        });
      }
    }, error => {
      this.isLoading = false;
      this.show_loader = false;
    });
  }

  _showSnackbar(message) {
    this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
  }


  contains(a: string, b: string) {
    return a.toLowerCase().indexOf(b.toLowerCase()) >= 0;
  }
  
  openModal(mode: Mode, id = null, item = null) {
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Create Collegey Opportunity" : "Update Collegey Opportunity",
      nzContent: AddCollegeyopportunitiesComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.save().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this.getCollegeyOpportunitiesList(params);
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
      nzWidth:900,
      nzComponentParams: {
        mode: mode,
        id: id,
      },  
    });
  }

  deleteCollegeyOpportunities(listid:any)
  {
    if(confirm("Are you sure to active this collegey opportunities"))
    {
      let actionType = false;
      var mylist = {id:listid,actionType:actionType};
      this.mentorService.deleteCollegeyOpportunities(mylist).subscribe(
        (response)=> { 
          if (response.status == 'success') {
            Swal.fire({
              title: 'Active Successful',
              text: 'Update Collegey Opportunities Active Succesfully',
              icon: 'success',
            });
            this.activatedRoute.queryParams.subscribe(params => {
              this.getCollegeyOpportunitiesList(params);
            });
          }
        },
      );
    }
  }

  activeCollegeyOpportunities(listid:any)
  {
    if(confirm("Are you sure to delete this collegey opportunities"))
    {
      let actionType = true;
      var mylist = {id:listid,actionType:actionType};
      this.mentorService.deleteCollegeyOpportunities(mylist).subscribe(
        (response)=> { 
          if (response.status == 'success') {
            Swal.fire({
              title: 'In-active Successful',
              text: 'Update Collegey Opportunities In-active Succesfully',
              icon: 'success',
            });  
            this.activatedRoute.queryParams.subscribe(params => {
              this.getCollegeyOpportunitiesList(params);
            });
          }
        },
      );
    }
  }



}
