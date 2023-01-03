import { Component, OnInit, Input, ElementRef, ViewChild, ChangeDetectorRef} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { Programme } from 'src/app/core/models/programmes.model';
import { DialogService } from 'src/app/core/services/dialog.service';
import { ProgrammesService } from 'src/app/core/services/programmes.service';
import { AppConstants } from 'src/app/shared/constants/app.constants';
import { AddProgrammesComponent } from '../add-programmes/add-programmes.component';

enum Mode {
  Create = 'Create',
  Edit = 'Edit'
}

@Component({
  selector: 'app-programmes-listing',
  templateUrl: './programmes-listing.component.html',
  styleUrls: ['./programmes-listing.component.css']
})
export class ProgrammesListingComponent implements OnInit {
  isLoading = false;
  programmes: Programme[] = [];
  searchText: string = "";
  modal: NzModalRef;
  Mode = Mode;
  @ViewChild("searchBox") searchBox: ElementRef;
  @ViewChild("fileImportInput") fileImportInput: any;
  keyup$: Observable<any>;
  constructor(
    private programmeService: ProgrammesService,
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private modalService: NzModalService,
    private ref: ChangeDetectorRef
    ) { }

    addNewProgramme() {
      const dialogConfig = this.dialogService.configureDialog(null);
      this.dialog.open(AddProgrammesComponent, dialogConfig).afterClosed().subscribe(response => {
        if(response) {
          this.programmes.push(response);
        }
      })
    }
  
    _getProgrammes(filter) {
      this.programmeService.getProgrammesList(filter).subscribe(programme => {
        this.isLoading = false;
        this.programmes  = programme.docs;

        if (programme?.totalDocs <= programme?.limit || programme?.totalDocs <= 0) {
          this._showSnackbar("No more data found")
          this.isLoading = true;
        }   
        this.ref.detectChanges();
      }, (error) => {
        this.isLoading = false;
        this.snackBar.open(error.message || error.error, null);
      });
  
    }

    deleteProgram(id,programme){
      this.programmeService.deleteProgram(id).subscribe(programme =>{
        this.activatedRoute.queryParams.subscribe(params => {
          this._getProgrammes(params);
        });
      })
    }
  
    _showSnackbar(message) {
      this.snackbar.open(message, null, { duration: AppConstants.TOAST_DISPLAY_TIME })
    }
  
    ngOnInit(): void {
      this.activatedRoute.queryParams.subscribe(params => {
        this._getProgrammes(params);
      });
    }
    openModal(mode: Mode, id = null, item = null) {
      console.log("Clicked")
      this.modal = this.modalService.create({
        nzTitle: mode === "Create" ? "Create Programme" : "Update Programme",
        nzContent: AddProgrammesComponent,
        nzFooter: [
          {
            label: mode === "Create" ? "Create" : "Update",
            show: item ? (item.isDeleted ? false : true) : true,
            type: "primary",
            onClick: (componentInstance) => {
              componentInstance!.onSubmitForm().then(() => {
                componentInstance!.cancel();
                this.activatedRoute.queryParams.subscribe(params => {
                  this._getProgrammes(params);
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
          programme:item
        },
      });
    }

}
