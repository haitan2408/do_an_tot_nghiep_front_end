import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatSnackBar} from '@angular/material';
import {CommentService} from '../../../service/comment.service';
import {Router} from '@angular/router';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-view-comment-admin',
  templateUrl: './view-comment-admin.component.html',
  styleUrls: ['./view-comment-admin.component.css']
})
export class ViewCommentAdminComponent implements OnInit {
  size = 5;
  loading = false;
  pageClicked = 0;
  pages = [];
  totalPages = 1;
  idPost: number = -1;
  comments = [];

  constructor(@Inject(MAT_DIALOG_DATA) private data: number, private commentService: CommentService, private router: Router,
              private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.idPost = data;
  }

  ngOnInit() {
    this.onSubmit(0);
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

  onSubmit(page) {
    this.loading = true;
    this.commentService.getAllCommentByIdPost(this.idPost, page, this.size).subscribe(
      data => {
        console.log(data);
        this.loading = false;
        this.comments = data.content;
        this.pageClicked = page;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      }, error => {
        this.loading = false;
        if (error.status == 401) {
          this.snackBar.open('Bạn không có quyền vào trang này!', '', {
            duration: 4000,
          });
          this.router.navigateByUrl('/login');
        }
      }
    );
  }

  openConfirm(id: number, username: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        type: 'comment',
        username: username
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.commentService.deleteCommentByAdmin(id).subscribe(next => {
            this.snackBar.open('Delete successfully!', 'delete', {
              duration: 2000,
            });
          this.ngOnInit();
          }, error => {
            this.snackBar.open('Error!', '', {
              duration: 4000,
            });
          }
        );

      }

    });
  }
}
