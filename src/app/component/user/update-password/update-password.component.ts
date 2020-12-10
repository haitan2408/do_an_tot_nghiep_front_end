import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {ConfirmLockUserComponent} from '../../admin/confirm-lock-user/confirm-lock-user.component';
import {UserService} from '../../../service/user.service';
import {error} from 'util';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  updatePassForm: FormGroup;
  loading = false;
  currentPassword = '';
  newPassword = '';
  idUser = 0;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private userService: UserService, private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) private data: number, private dialogRef: MatDialogRef<UpdatePasswordComponent>) {
    this.idUser = data;
  }

  ngOnInit() {
    this.updatePassForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      password: this.formBuilder.group({
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, {
        validator: this.comparePassword,

      })
    });
  }

  comparePassword(c: AbstractControl) {
    const v = c.value;
    return (v.newPassword === v.confirmPassword) ? null : {
      passwordnotmatch: true
    };
  }

  onSubmit() {
    const dialogRef = this.dialog.open(ConfirmLockUserComponent, {
      data: {
        type: 'update password',
        username: 'mình'
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      this.loading = true;
      if (confirmed) {
        if (this.updatePassForm.valid) {
          this.currentPassword = this.updatePassForm.get('currentPassword').value;
          this.newPassword = this.updatePassForm.get('password').get('newPassword').value;
          if (this.currentPassword == this.newPassword) {
            this.snackBar.open('Same old password', 'Error', {
              duration: 4000,
            });
          } else {
            this.userService.updatePassword(this.idUser, this.newPassword, this.currentPassword)
              .subscribe(res => {
                this.dialogRef.close(true);
              }, error => {
               this.dialogRef.close(false)
              }, ()=> {
                this.loading = false;
              });
          }
        } else {
          this.dialogRef.close(false);
        };

      }
    });
  }
}
