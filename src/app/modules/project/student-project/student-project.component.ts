import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from 'src/app/core/services/project.service';
import { Project } from 'src/app/core/models/project.model';
import { AddProjectComponent } from '../add-project/add-project.component';
import { AddStudentprojectComponent } from '../add-studentproject/add-studentproject.component';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-student-project',
  templateUrl: './student-project.component.html',
  styleUrls: ['./student-project.component.css']
})
export class StudentProjectComponent implements OnInit {
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
    private cdr: ChangeDetectorRef,

  ) { }

  getProjectList(filter) {
    this.projectService.getStudentProjectList(filter).subscribe(response => {
      this.projectList = response.docs;
      this.isLoading = false;
      if (response.totalDocs <= response.limit || this.projectList.length <= 0) {
        this._showSnackbar("No more data found")
        this.isLoading = true;
      }
      this.cdr.detectChanges();
    }, error => {
      this.isLoading = false;
      this.snackbar.open(error.message, null, { duration: 3000 });
    });
  }

  sendActivationProject(id, item) {
    let obj = { project_id: id, status: 'active' };
    this.projectService.sendProjectActivation(obj).subscribe(response => {
      this.isLoading = false;
      this.activatedRoute.queryParams.subscribe(params => {
        this.getProjectList(params);
      });
      Swal.fire({
        title: 'Successful',
        text: 'Project confirm successfully',
        icon: 'success',
      });
    }, error => {
      Swal.fire(
        'Failed to project update',
        'error'
      );
    });
  }

  sendRejectProject(id, item) {
    let obj = { project_id: id, status: 'reject' };
    this.projectService.sendProjectActivation(obj).subscribe(response => {
      this.isLoading = false;
      this.activatedRoute.queryParams.subscribe(params => {
        this.getProjectList(params);
      });
      Swal.fire({
        title: 'Successful',
        text: 'Project Rejected successfully',
        icon: 'success',
      });
    }, error => {
      Swal.fire(
        'Failed to project update',
        'error'
      );
    });
  }

  _showSnackbar(message) {
    this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
  }

  openCreateProjectModal() {
    this.dialog
      .open(AddStudentprojectComponent)
      .afterClosed()
      .subscribe((project) => {
        if (project && Object.keys(project).length > 0) {
          this.projectList.push(project);
        }
      });
  }

  deleteProject(id, project) {
    this.projectService.deleteProject(id).subscribe(project => {
      this.activatedRoute.queryParams.subscribe(params => {
        this.getProjectList(params);
      });
    })
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.getProjectList(params);
    });
  }
  openModal(mode: Mode, id = null, item = null) {
    console.log("Clicked")
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Create Project" : "Update Project",
      nzContent: AddStudentprojectComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.onSubmitForm().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this.getProjectList(params);
              });
            });
          },
        },
        {
          label: mode === "Create" ? "Create" : "Update & Confirm",
          show: mode == 'Edit',
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.onSubmitForm().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this.getProjectList(params);
              });
              this.sendActivationProject(id, item)
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
      nzWidth: 900,
      nzComponentParams: {
        mode: mode,
        id: id,
        project: item
      },
    });
  }

}
