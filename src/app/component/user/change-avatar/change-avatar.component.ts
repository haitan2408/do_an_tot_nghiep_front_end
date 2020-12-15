import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  styleUrls: ['./change-avatar.component.css']
})
export class ChangeAvatarComponent implements OnInit {
  user: any = null;
  loading = false;
  selectedFile: File = null;
  downloadURL: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private storage: AngularFireStorage, private userService: UserService,
              private dialogRef: MatDialogRef<ChangeAvatarComponent>,private snackBar: MatSnackBar) {
    this.user = data;
  }

  ngOnInit() {
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        (<HTMLImageElement> document.getElementById('img-avatar')).src = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubmitImgFireBase() {
    let date = new Date();
    const filePath = 'avatar/' + this.user.username + '_avatar_'+date.getTime();
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedFile);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.downloadURL = url;
              this.onSubmitChangeImg(this.downloadURL);
            });
          }
        ))
      .subscribe(data => {
      });
  }

  private onSubmitChangeImg(downloadUrl) {
    this.loading = true;
    this.userService.changeImg(this.user.email, downloadUrl).subscribe(data => {
      this.snackBar.open('Update img successfully', '', {
        duration: 3000,
      });
      this.dialogRef.close(true);
    }, error => {
      this.snackBar.open('Update error', '', {
        duration: 3000,
      });
      this.dialogRef.close(false);
    }, () => {
         this.loading=false;
    });
  }
}
