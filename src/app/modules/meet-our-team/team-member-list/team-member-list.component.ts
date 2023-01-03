import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { MeetOurTeamService } from 'src/app/core/services/meet-our-team.service';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import Swal from 'sweetalert2';
import { TeamMemberComponent } from '../team-member/team-member.component';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-team-member-list',
  templateUrl: './team-member-list.component.html',
  styleUrls: ['./team-member-list.component.css']
})
export class TeamMemberListComponent implements OnInit {

  isLoading = false;
  teamList: any = [];
  searchText: string = "";
  modal: NzModalRef;
  Mode = Mode;

  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private motService: MeetOurTeamService,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {      
      this.getTeamList(params);
    });
  }

  getTeamList(filter) {    
    this.motService.getTeam().subscribe((res) => {      
      this.teamList = res['data']; 
      this.isLoading = false;
      if ( res['data']?.totalDocs <=  res['data']?.limit || this.teamList?.length <= 0) {
        this._showSnackbar("No more data found")
        this.isLoading = true;
      }
      this.cdr.detectChanges();
    }, error => {
      this.isLoading = false;
      this.snackbar.open(error.message, null, { duration: 3000 });
    });
  }

  openModal(mode: Mode, id= null, item= null) {    
    
    this.modal = this.modalService.create({
      nzTitle: mode === "Create" ? "Create New" : "Update ",
      nzContent: TeamMemberComponent,
      nzFooter: [
        {
          label: mode === "Create" ? "Create" : "Update",
          show: item ? (item.isDeleted ? false : true) : true,
          type: "primary",
          onClick: (componentInstance) => {
            componentInstance!.save().then(() => {
              componentInstance!.cancel();
              this.activatedRoute.queryParams.subscribe(params => {
                this.getTeamList(params);
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
  _showSnackbar(message) {
    this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
  }

  deleteArticle(listid: any) {

    if (confirm('Are you sure to delete this member')) {
      this.motService.deleteTeamMember(listid).subscribe((response) => {
        if ((response.status = 'success')) {
          Swal.fire({
            title: 'Delete Successful',
            text: response.message,
            icon: 'success',
          });
          this.activatedRoute.queryParams.subscribe((params) => {
            this.getTeamList(params);
          });
        }
      });
    }
  }

}
