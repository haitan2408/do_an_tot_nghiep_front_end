import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {PostService} from '../../../service/post.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {
  dataTemp = "";
  constructor(@Inject(MAT_DIALOG_DATA) private data: string,private dialogRef: MatDialogRef<ConfirmDeleteComponent>) {
      this.dataTemp = data
  }

  ngOnInit() {
  }

  onConfirmClick(isDelete: boolean) {
    if (isDelete) {
      this.dialogRef.close(true);
    } else {
      this.dialogRef.close(false);
    }
  }
}
