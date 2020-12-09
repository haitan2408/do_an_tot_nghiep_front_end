import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {PostService} from '../../../service/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  listError: any = "";
  editForm: FormGroup;
  post: any;
  loading =false;

  validation_messages = {
    'title': [
      {type: 'required', message: 'Tiêu đề bài viết không được để trống.'}
    ],
    'content': [
      {type: 'required', message: 'Nội dung của bài viết không được để trống.'}
    ],
  }
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: any, private tokenStorageService: TokenStorageService,
              private postService: PostService,  private dialogRef: MatDialogRef<EditPostComponent>) {
    this.post = data.post;
  }

  ngOnInit() {
    this.createNewFormPost();
  }

  createNewFormPost() {

    this.editForm = this.fb.group({
      id: new FormControl(this.data.post.id),
      title: new FormControl(this.data.post.title, Validators.compose([
        Validators.required,
      ])),
      content: new FormControl(this.data.post.content, Validators.compose([
        Validators.required,
      ])),
    })
  }

  onSubmitEditPost() {
    this.loading = true;
     if(this.tokenStorageService.getUsername() == this.post.user.username) {
       if (this.editForm.valid) {
         this.post.title = this.editForm.get('title').value;
         this.post.content = this.editForm.get('content').value;
         this.loading = false;
         this.postService.editPost(this.editForm.value).subscribe(next => {
              this.dialogRef.close(true);
         });
       }
     }
  }
}
