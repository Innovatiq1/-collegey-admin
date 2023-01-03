import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from 'src/app/core/services/project.service';
import { Project } from 'src/app/core/models/project.model';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}
@Component({
  selector: 'app-ordered-list',
  templateUrl: './ordered-list.component.html',
  styleUrls: ['./ordered-list.component.css']
})
export class OrderedListComponent implements OnInit {

  isLoading = false;
  projectList: Project[] = [];
  searchText: string = "";
  modal: NzModalRef;
  Mode = Mode;
  @ViewChild("searchBox") searchBox: ElementRef;
  @ViewChild("fileImportInput") fileImportInput: any;
  keyup$: Observable<any>;
  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
  ) { }

  getProjectOnGoingList(filter) {
    this.isLoading = true;
    this.projectService.getProjectOrderedList(filter).subscribe( (response:any) =>{
      this.projectList = response.data
      console.log(this.projectList,"khus");
      if(response.totalDocs - (+filter.limit) < -11) {
        this._showSnackbar("No more data found")

      }
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.snackbar.open(error.message, null , {duration: 3000});
    });
  }

  _showSnackbar(message) {
    this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
  }

  openCreateProjectModal() {
    this.dialog
      .open(AddProjectComponent)
      .afterClosed()
      .subscribe((project) => {
        if (project && Object.keys(project).length > 0) {
          this.projectList.push(project);
        }
      });
  }

  deleteProject(id,project){
    this.projectService.deleteProject(id).subscribe(project=>{
      this.activatedRoute.queryParams.subscribe(params => {
        this.getProjectOnGoingList(params);
        });
    })
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
    this.getProjectOnGoingList(params);
    });
  }
  openModal(mode: Mode, id = null, item = null) {
    console.log("Clicked")
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Create Project" : "Update Project",
      nzContent: AddProjectComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.onSubmitForm().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this.getProjectOnGoingList(params);
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
        project:item
      },
    });
  }  
}



