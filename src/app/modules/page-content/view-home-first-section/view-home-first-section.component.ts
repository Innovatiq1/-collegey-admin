import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';

// Load Services
import { PageContentService } from 'src/app/core/services/home-service/page-content.service';

// Componets
import { AddHomeFirstSectionComponent } from '../add-home-first-section/add-home-first-section.component';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}
@Component({
  selector: 'app-view-home-first-section',
  templateUrl: './view-home-first-section.component.html',
  styleUrls: ['./view-home-first-section.component.css']
})

export class ViewHomeFirstSectionComponent implements OnInit {

  modal: NzModalRef;
  Mode = Mode;
  assignData = [];
  constructor(
    private pageContentService: PageContentService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getHomeFirstSecData(params);
    });
  }

  getHomeFirstSecData(filters) {
    this.pageContentService.getHomeFirstSecData(filters).subscribe( response =>{
       this.assignData  = response?.data?.docs[0]?.home_first_section;
      this.ref.detectChanges();
      if(response?.data?.totalDocs - (+filters.limit) < -11) {
        // this._showSnackbar("No more data found")
      }
    }, error => {
      // this.isLoading = false;
    });
  }

  openModal(mode: Mode, id = null, item = null) {
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Create Home First Section" : "Update Home First Section",
      nzContent: AddHomeFirstSectionComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.save().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this.getHomeFirstSecData(params);
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
        itemData: item
      },
    });
  }
  deleteHome(index: any) {
    if (confirm("Are you sure to delete this item")) {

      var deletelist = { index: index, filedName: "home_first_section" };
      this.pageContentService.deleteHomeContents(deletelist).subscribe(
        (response) => {
          if (response.status == 'success') {
            this.activatedRoute.queryParams.subscribe(params => {
              this.getHomeFirstSecData(params);
            });
          }
        },
      );
    }
  }

}
