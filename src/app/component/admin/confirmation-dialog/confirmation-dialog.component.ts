import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {PostService} from '../../../service/post.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  temp: number;
  username: string;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<ConfirmationDialogComponent>, private postService: PostService) {
    this.temp =data.type;
    this.username = data.username;
  }

  ngOnInit() {
  }

  onConfirmClick(isDelete) {
    if(isDelete) {
       this.dialogRef.close(true)
    } else {
      this.dialogRef.close(false);
    }


  }
}
