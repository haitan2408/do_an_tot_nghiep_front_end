import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {PostService} from '../../../service/post.service';

@Component({
  selector: 'app-confirm-lock-user',
  templateUrl: './confirm-lock-user.component.html',
  styleUrls: ['./confirm-lock-user.component.css']
})
export class ConfirmLockUserComponent implements OnInit {

  temp: number;
  username: string;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<ConfirmLockUserComponent>) {
    this.temp =data.type;
    this.username = data.username;
  }

  ngOnInit() {
  }

  onConfirmClick(isDelete) {
    if (isDelete) {
      this.dialogRef.close(true)
    } else {
      this.dialogRef.close(false);
    }
  }
}
