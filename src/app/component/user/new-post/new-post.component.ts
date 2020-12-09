import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../service/user.service';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {PostService} from '../../../service/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  listError: any = "";
  registerForm: FormGroup;
  loading = false;
  validation_messages = {
    'title': [
      {type: 'required', message: 'Tiêu đề bài viết không được để trống.'}
    ],
    'content': [
      {type: 'required', message: 'Nội dung của bài viết không được để trống.'}
    ],
  }
  constructor(private fb: FormBuilder, private router: Router, private postService: PostService, private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<NewPostComponent>) { }

  ngOnInit() {
    this.createNewFormPost();
  }

  createNewFormPost() {
    this.registerForm = this.fb.group({
      title: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      content: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    })
  }

  onSubmitNewPost() {
    this.loading = true;
    if (this.registerForm.valid) {
      this.postService.createPost(this.registerForm.value).subscribe(data => {
        this.snackBar.open('Add post successfully!', '', {
          duration: 3000,
        });
        this.dialogRef.close(true);
      }, error => {
        if (error.status === 400) {
          this.listError = error.error;
        }else if (error.status === 401) {
          this.snackBar.open('Error 401', 'error', {
            duration: 3000,
          });
          this.router.navigateByUrl("/login");
        }else if (error.status === 403) {
          this.snackBar.open('Error 403', 'error', {
            duration: 3000,
          });
        }
      },() => {
        this.loading = false;
      })
    }
  }
}
