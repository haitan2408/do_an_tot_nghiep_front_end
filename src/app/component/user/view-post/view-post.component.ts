import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../../service/post.service';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ConfirmDeleteComponent} from '../confirm-delete/confirm-delete.component';
import {CommentService} from '../../../service/comment.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
   id: number;
   post = "";
   email : string ="";
   formComment: FormGroup;
   success = false;
   loading= false;
   idCommentEdit=0;
   contentCommentEdit ="";

  constructor(private router: Router, private route: ActivatedRoute, private postService: PostService,
              private tokenStorageService: TokenStorageService, private fb: FormBuilder, private snackBar: MatSnackBar,
              private dialog: MatDialog, private commentService: CommentService) {

  }
   ngOnInit() {
     this.email = this.tokenStorageService.getEmail();
    this.loading = true;
    this.id = +this.route.snapshot.params['id'];
    this.postService.getPostById(this.id).subscribe(data=> {
      this.post = data;
      this.loading = false;
    })
     this.createFormRegister();
  }

  createFormRegister() {
    this.formComment = this.fb.group({
      body: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    })
  }

  onSubmitNewComment() {
    this.loading = true;
    if (this.formComment.valid) {
      this.commentService.addComment(this.formComment.value, this.id).subscribe(data => {
        this.snackBar.open('Add comment successfully!', 'add', {
          duration: 2000,
        });
        this.loading = false;
        this.ngOnInit();
      })
    }
  }

  viewProfile(email: string) {
    this.router.navigateByUrl("view-profile/"+email);
  }
  deleteComment(comment) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: "comment"
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      this.loading = true;
      if (confirmed) {
        if(this.email == comment.user.email) {
          this.commentService.deleteCommentByUser(comment.id).subscribe(data=> {
            this.snackBar.open('Delete comment successfully!', 'OK', {
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
    }, error => {
      this.snackBar.open('Error!', '', {
        duration: 4000,
      });
    }, ()=> {
      this.loading = false;
    });
  }

  editComment(comment: any) {
    this.idCommentEdit = comment.id;
    this.contentCommentEdit =comment.body;
  }

  updateComment(comment: any) {
    if(comment.user.email == this.email) {
       this.commentService.updateComment(this.idCommentEdit, this.contentCommentEdit).subscribe(data=> {
         this.snackBar.open('Edit comment successfully!', '', {
           duration: 4000,
         });
         this.contentCommentEdit="";
         this.idCommentEdit=0;
          this.ngOnInit();
       },error => {
         this.snackBar.open('Error!', '', {
           duration: 4000,
         });
       })
    }
  }
}
