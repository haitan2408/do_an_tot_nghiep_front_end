import {Component, Input, OnInit} from '@angular/core';
import {PostService} from '../../../service/post.service';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {Router} from '@angular/router';
import {ConfirmationDialogComponent} from '../../admin/confirmation-dialog/confirmation-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {EditPostComponent} from '../edit-post/edit-post.component';
import {NewPostComponent} from '../new-post/new-post.component';
import {ConfirmDeleteComponent} from '../confirm-delete/confirm-delete.component';
import {error} from 'util';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  loading = false;
  postList: any = [];
  email = '';

  constructor(private postService: PostService, private tokenStorageService: TokenStorageService, private router: Router,
              private dialog: MatDialog, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.email = this.tokenStorageService.getEmail();
    this.loading = true;
    this.postService.getAllPost().subscribe(data => {
      this.postList = data;
      this.loading = false;
    });
  }

  viewPost(id: number) {
    this.router.navigateByUrl('/view-post/' + id);
  }

  editPost(post: any) {
    const dialogRef = this.dialog.open(EditPostComponent, {
      width: '40%',
      height: '90%',
      data: {
        post: post
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.snackBar.open('Edit successfully!', '', {
          duration: 3000,
        });
        this.ngOnInit();
      }
    });
  }

  addPost() {
    const dialogRef = this.dialog.open(NewPostComponent, {
      width: '40%',
      height: '90%',
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.ngOnInit();
      }
    });

  }

  viewProfile(email: string) {
    this.router.navigateByUrl("view-profile/"+email);
  }

  deletePost(post: any) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: "bài đăng"
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      this.loading = true;
      if (confirmed) {
        if(this.email == post.user.email) {
          this.postService.deletePostByUser(post.id).subscribe(data=> {
            this.snackBar.open('Delete post successfully!', 'OK', {
              duration: 4000,
            });
            this.ngOnInit();
          });
        } else {
          this.snackBar.open('Forbidden Error!', '403', {
            duration: 4000,
          });
        };
      }
    }, error=> {
      this.snackBar.open('Error!', '', {
        duration: 4000,
      });
    }, ()=> {
      this.loading = false;
    });

  }
}
