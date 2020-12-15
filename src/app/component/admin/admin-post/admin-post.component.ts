import {Component, OnInit} from '@angular/core';
import {PostService} from '../../../service/post.service';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {ViewPostAdminComponent} from '../view-post-admin/view-post-admin.component';
import {ViewCommentAdminComponent} from '../view-comment-admin/view-comment-admin.component';

@Component({
  selector: 'app-admin-post',
  templateUrl: './admin-post.component.html',
  styleUrls: ['./admin-post.component.css']
})
export class AdminPostComponent implements OnInit {
  loading = false;
  size = 5;
  pageClicked = 0;
  pages = [];
  totalPages = 1;
  search = '';
  listPost = [];

  constructor(private postService: PostService, private router: Router, private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.onSubmit(0);
  }

  onSubmit(page) {
    this.loading = true;
    this.postService.getAllPostByAdmin(page, this.size, this.search).subscribe(
      data => {
        if(data==null) {
          this.snackBar.open('Không có dữ liệu mà bạn tìm kiếm!', '', {
            duration: 4000,
          });
          this.search="";
          this.onSubmit(0);
        } else {
          this.loading = false;
          this.listPost = data.content;
          this.pageClicked = page;
          this.totalPages = data.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        }
      }
    );
  }

  onNext() {
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      this.onSubmit(this.pageClicked);
    }
  }

  onPrevious() {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      this.onSubmit(this.pageClicked);
    }
  }

  onFirst() {
    this.pageClicked = 0;
    this.onSubmit(this.pageClicked);
  }

  onLast() {
    this.pageClicked = this.totalPages - 1;
    this.onSubmit(this.pageClicked);
  }

  openConfirm(id: number, username: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        type: "bài đăng",
        username: username
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.postService.deletePost(id).subscribe(next => {
          this.snackBar.open('Delete successfully!', 'delete', {
            duration: 4000,
          })
          this.ngOnInit();
          },error => {
            this.snackBar.open('Error!', '', {
              duration: 4000,
            });
          }

        )

      }

    });
  }

  viewPost(post: any) {
    const dialogRef = this.dialog.open(ViewPostAdminComponent, {
      width: "80%",
      data: post
    });
  }

  viewCommentOfPost(id: number) {
    const dialogRef = this.dialog.open(ViewCommentAdminComponent, {
      width: "80%",
      data: id
    });
  }
}
