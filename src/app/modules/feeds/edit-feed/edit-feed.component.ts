import { Component, Input, OnInit} from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/core/services/common.service';
import { ImageSource } from 'src/app/core/enums/image-upload-source.enum';
import { FeedService } from 'src/app/core/services/feed.service';

import { Feed } from 'src/app/core/models/feed.model';
import Swal from 'sweetalert2';
import { filter } from 'rxjs/internal/operators/filter';


@Component({
  selector: 'app-edit-feed',
  templateUrl: './edit-feed.component.html',
  styleUrls: ['./edit-feed.component.css']
})

export class EditFeedComponent implements OnInit {
  //@Input() feedData;
  postForm: FormGroup;
  feedData: any
  pageContent: any;
  PostEditImage: any;
  fetchcurrentImageheight: any;
  fetchcurrentImagewight: any;
  removeImageFile: boolean = false;
  imageSelect: boolean = false;
  toaster: any;
  hyperlinkArray: any[];
  //feedService: FeedService;
  //removeImageFile: boolean = false;

  //fb: any;

  constructor(
    private modal: NzModalRef,
    public commonService: CommonService,
    private fb: FormBuilder,
    private feedService: FeedService,
    //zzzet feedData1=feedData
  ) {
    this.postForm = this.fb.group({
      postText: ['', [Validators.required, Validators.pattern(/^(?!\s*$).+/)]],
      posturl: [''],
      postImageUrl: [''],
    });
    this.postForm.valueChanges.subscribe(() => {
    });
    
   }

  ngOnInit(): void {
    this.fetchUpdated()
  }
  fetchUpdated() {
    this.patchForm(this.feedData);
  }
  patchForm(pageContent) {
    
    //console.log("====ddd===",pageContent)
    this.pageContent = pageContent;
    this.postForm.patchValue({
      postText: pageContent?.postText,
      posturl: pageContent?.posturl,
      postImageUrl: pageContent?.postImageUrl,
      
    });
    if (pageContent?.postType == "image") {
      if (pageContent?.postImageUrl.includes('http')) {
        this.PostEditImage = pageContent?.postImageUrl;
      }
      else {
        this.PostEditImage = this.commonService.imagePathS3(pageContent?.postImageUrl);
      }
    }
    this.markAllTouched();
  }
  
  removeImage() {
    this.removeImageFile = true;
    this.postForm.get("postImageUrl").setValue(null)
    this.PostEditImage = null

  }

  // markAllTouched() {
  //   throw new Error('Method not implemented.');
  // }
  onFileSelect(event) {

    var _URL = window.URL || window.webkitURL;
    var fileMatch, imgesData;

    if ((fileMatch = event.target.files[0])) {
      imgesData = new Image();
      var objectUrl = _URL.createObjectURL(fileMatch);
      imgesData.onload = function () {
        var currentWidth = this.width;
        var currentHeight = this.height;
        window.localStorage.setItem('currentImageheight', currentHeight);
        window.localStorage.setItem('currentImagewight', currentWidth);
        _URL.revokeObjectURL(objectUrl);
      };
      imgesData.src = objectUrl;
    }

    setTimeout(() => {

      this.fetchcurrentImageheight = localStorage.getItem('currentImageheight');
      this.fetchcurrentImagewight = localStorage.getItem('currentImagewight');

      if (this.fetchcurrentImagewight <= 2000 && this.fetchcurrentImageheight <= 2000) {
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          const fd = new FormData();
          fd.append('files', file);
          fd.append('type', 'single');
          this.commonService.uploadImage(fd, ImageSource.COLLEGYFEED).subscribe((res) => {
            this.removeImageFile = false;
            this.postForm.get('postImageUrl').setValue(res);
            this.PostEditImage = this.commonService.imagePathS3(res);
            console.log("dddddddddddddd",this.commonService.imagePathS3(res))
            this.imageSelect = true;
          });
        }
      }
      else {
        this.toaster.error('The maximum size for the 2000 X 2000');
        localStorage.removeItem('currentImageheight');
        localStorage.removeItem('currentImagewight');
        return;
      }
    }, 1000);

  }
  save() {
    //console.log("==========opa")
    this.hyperlinkArray = [];
    return new Promise<void>((resolve, reject) => {
      this.markAllTouched();
      if (this.postForm.valid) {
       
    //obj['user'] = this.userId;
    let obj = this.postForm.value;
    this.fetchandFindURLs(obj.posturl);

    if (typeof this.hyperlinkArray != 'undefined' && this.hyperlinkArray.length > 0) {
      //console.log("==========vfnnnnnnnnnnnnff")
      obj['post_url'] = this.hyperlinkArray[0];
    }
       
          
          obj['id']= this.pageContent._id  
          obj['user']= this.pageContent.user.id
          
          if (obj['post_url']) {
            if (!this.imageSelect) {
              if (obj["postImageUrl"] != null) {
                if (obj["postImageUrl"].indexOf("https") == 0) {
                  obj["postImageUrl"] = null;
                }
              } else {
                obj["postImageUrl"] = null;
              }
    
            }
          }
         
          
          this.feedService.editFeeds(obj).subscribe(
            (res) => {
              this.modal.destroy();
              resolve();
              Swal.fire({
                title: 'Successful',
                text: res.message,
                icon: 'success',
              });
              this.feedService.getFeedList(filter)
            },
            (err) => {
              debugger;
              reject();
              Swal.fire( 
                'Add data faild',
                'error'
              );
            },
            () => {
              reject(); 
            }
          );

        } 
      })
    
  }
  fetchandFindURLs(message) {
    if (!message) return;
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    let newhyperLink = [];
    message.replace(urlRegex, function (url) {
      var hyperlink = url;
      if (!hyperlink.match('^https?:\/\/')) {
        hyperlink = 'http://' + hyperlink;
      }
      newhyperLink.push(hyperlink);
    });
    for (let i = 0; i < newhyperLink?.length; i++) {
      this.hyperlinkArray.push(newhyperLink[i]);
    }
  }

  




  cancel() {
    this.modal.destroy();
  }
  markAllTouched() {
    for (const i in this.postForm.controls) {
      this.postForm.controls[i].markAsDirty();
      this.postForm.controls[i].updateValueAndValidity();
    }
  }

}

function parmas(parmas: any) {
  throw new Error('Function not implemented.');
}
