import { Component, OnInit, NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { Blog } from 'src/app/core/models/blog.model';
import { DialogService } from 'src/app/core/services/dialog.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { ActivatedRoute } from '@angular/router';
import { PipeModule } from 'src/app/shared/pipe.module';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  isLoading = false;
  blogInfo: Blog;

  constructor(
    private snackbar: MatSnackBar,
    private blogsService: BlogsService,
    private dialogRef: MatDialogRef<BlogDetailComponent>,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private activatedRoute: ActivatedRoute,
    public commonService: CommonService
  ) {}

  closeModal() {
    this.dialogRef.close();
  }

  async openUpdateModal() {
    const { AddBlogComponent } = await import('../add-blog/add-blog.component');
    const dialogConfig = this.dialogService.configureDialog({
      updatedBlogInfo: this.blogInfo,
    });
    this.dialog
      .open(AddBlogComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.blogInfo = data;
          console.log(this.blogInfo);
        }
      });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.blogsService.getBlogInfo(param.id).subscribe((response) => {
        this.blogInfo = response;
      });
    });
  }
}

@NgModule({
  declarations: [BlogDetailComponent],
  imports: [MaterialModule, CommonModule, PipeModule],
})
class BlogDetailModule {}
