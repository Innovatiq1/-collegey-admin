import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from 'src/app/core/services/dialog.service';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { AddProjectComponent } from '../add-project/add-project.component';
import { CommonService } from 'src/app/core/services/common.service';
import { Project } from 'src/app/core/models/project.model';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  isLoading = false;
  projectDetail: Project;
  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private projectService: ProjectService,
    private matSnackBar: MatSnackBar,
    private dialogService: DialogService,
    public commonService: CommonService
  ) { }

  _getProjectDetail(id) {
    this.isLoading = true;
    this.projectService.getProjectDetails(id).subscribe(detail => {
      this.projectDetail = detail;
      this.isLoading = false;
    },(error) => {
      this.isLoading = false;
      this.matSnackBar.open(error.error || error.message, null, {
          duration: AppConstants.TOAST_DISPLAY_TIME
      });
  });
  }

  editProject() {
    const dialogConfig = this.dialogService.configureDialog({
      project: this.projectDetail
  });
    this.dialog.open(AddProjectComponent, dialogConfig).afterClosed().subscribe(projectDetail => {
      if (projectDetail) {
          this.projectDetail = projectDetail;
      }
  });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(urlParam => {
      this._getProjectDetail(urlParam.get('id'));
  });
  }

}
