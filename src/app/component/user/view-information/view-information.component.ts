import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {UserService} from '../../../service/user.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ChangeAvatarComponent} from '../change-avatar/change-avatar.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UpdatePasswordComponent} from '../update-password/update-password.component';

@Component({
  selector: 'app-view-information',
  templateUrl: './view-information.component.html',
  styleUrls: ['./view-information.component.css']
})
export class ViewInformationComponent implements OnInit {
  email = '';
  user: any = null;
  loading = false;
  username = '';
  listPost = [];
  amountComment = 0;
  updateForm: FormGroup;
  listError = '';
  isEdit = false;
  validation_messages = {
    'fullName': [
      {type: 'required', message: 'Full name được để trống.'}
    ],
    'username': [
      {type: 'required', message: 'Username không được để trống.'}
    ],
    'education': [
      {type: 'required', message: 'Education không được để trống.'}
    ],
    'skills': [
      {type: 'required', message: 'Skills không được để trống.'}
    ],
    'experience': [
      {type: 'required', message: 'Experience không được để trống.'}
    ]
  };

  constructor(private route: ActivatedRoute, private tokenStorageService: TokenStorageService, private router: Router,
              private userService: UserService, private snackBar: MatSnackBar, private dialog: MatDialog, private fb: FormBuilder) {
    this.createFormUpdate();
  }

  ngOnInit() {
    this.loading = true;
    this.email = this.route.snapshot.params['email'];
    this.userService.getProfile(this.email).subscribe(data => {
      this.listPost = data;
      this.userService.getProfileInformation(this.email).subscribe(data => {
        this.user = data;
        this.updateForm.patchValue(this.user);
      });
      for (let post of this.listPost) {
        this.amountComment += post.comments.length;
      }
    }, error => {
      this.snackBar.open('Not Found!', '', {
        duration: 3000,
      });
      this.router.navigateByUrl('/');
    }, () => {
      this.loading = false;
    });
    this.username = this.tokenStorageService.getUsername();
  }

  viewProfile() {
    this.router.navigateByUrl('view-profile/' + this.email);
  }

  viewInformation() {
    this.ngOnInit();
  }

  changeAvatar() {
    const dialogRef = this.dialog.open(ChangeAvatarComponent, {
      width: '30%',
      height: '90%',
      data: this.user
    });
    dialogRef.afterClosed().subscribe(async (confirmed: boolean) => {
      if (confirmed) {
        window.location.reload();
      }
    });
  }

  private createFormUpdate() {
    this.updateForm = this.fb.group({
      fullName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      education: new FormControl('', Validators.compose([
        Validators.required
      ])),
      skills: new FormControl('', Validators.compose([
        Validators.required
      ])),
      experience: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }

  onSubmitUpdate() {
    this.loading = true;
    console.log(this.updateForm.value);
    if (this.updateForm.valid) {
      this.userService.updateInformation(this.updateForm.value).subscribe(data => {
        this.tokenStorageService.saveUsername(this.updateForm.get('username').value);
        this.isEdit = false;
        this.snackBar.open('Update information successfully!', 'update', {
          duration: 2000,
        });
        this.ngOnInit();
      }, error => {
        this.snackBar.open('Update information error', 'error', {
          duration: 2000,
        });
      });

    }
  }

  viewFormEdit() {
    this.isEdit = true;
  }

  cancel() {
    this.isEdit = false;
  }

  updatePassword(id: number) {
    const dialogRef = this.dialog.open(UpdatePasswordComponent, {
      width: '40%',
      // height: '70%',
      data: id
    });
    dialogRef.afterClosed().subscribe(async (confirmed: boolean) => {
      if (confirmed) {
        this.snackBar.open('Update password successfully!', 'update', {
          duration: 4000,
        });
        this.ngOnInit();
      } else {
        this.snackBar.open('Update password failed!', 'update', {
          duration: 4000,
        });
      }
    });
  }
}
