import {Component, OnInit} from '@angular/core';
import {PostService} from '../../../service/post.service';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {UserService} from '../../../service/user.service';
import {ViewPostAdminComponent} from '../view-post-admin/view-post-admin.component';
import {ViewUserComponent} from '../view-user/view-user.component';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {ConfirmLockUserComponent} from '../confirm-lock-user/confirm-lock-user.component';

@Component({
  selector: 'app-manager-user',
  templateUrl: './manager-user.component.html',
  styleUrls: ['./manager-user.component.css']
})
export class ManagerUserComponent implements OnInit {
  loading = false;
  size = 5;
  pageClicked = 0;
  pages = [];
  totalPages = 1;
  search = '';
  listUser = [];

  constructor(private userService: UserService, private router: Router, private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.onSubmit(0);
  }

  onSubmit(page) {
    this.loading = true;
    this.userService.getAllUserByAdmin(page, this.size, this.search).subscribe(
      data => {
        if(data==null) {
          this.snackBar.open('Không có dữ liệu mà bạn tìm kiếm!', '', {
            duration: 4000,
          });
          this.search="";
          this.onSubmit(0);
        } else {
          this.loading = false;
          this.listUser = data.content;
          this.pageClicked = page;
          this.totalPages = data.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        }
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

  checkAccountAdmin(user) {
    for (let authority of user.authorities) {
      if (authority.authority == 'ROLE_ADMIN') {
        return true;
      }
    }
    return false;
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


  viewUser(user: any) {
    const dialogRef = this.dialog.open(ViewUserComponent, {
      width: '60%',
      data: user
    });
  }

  openConfirmLock(id: number, email: string) {
    const dialogRef = this.dialog.open(ConfirmLockUserComponent, {
      data: {
        type: 'lock',
        username: email
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      this.loading = true;
      if (confirmed) {
        this.userService.lockUserByAdmin(id).subscribe(next => {
            this.snackBar.open('Lock account successfully!', 'Lock', {
              duration: 2000,
            });
            this.onSubmit(this.pageClicked);
          }, error => {
            this.snackBar.open('Error!', '', {
              duration: 4000,
            });
          }, () => {
            this.loading = false;
          }
        );
      }
    });

  }

  openConfirmDelete(id: number, email: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        type: 'tài khoản',
        username: email
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      this.loading = true;
      if (confirmed) {
        this.userService.deleteUserByAdmin(id).subscribe(next => {
            this.snackBar.open('Delete successfully!', 'delete', {
              duration: 2000,
            });
            this.ngOnInit();
          }, error => {
            this.snackBar.open('Error!', '', {
              duration: 4000,
            });
          }, () => {
            this.loading = false;
          }
        );
      }
    });
  }

  openConfirmUnLock(id: number, email: string) {
    const dialogRef = this.dialog.open(ConfirmLockUserComponent, {
      data: {
        type: 'unlock',
        username: email
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      this.loading =true;
      if (confirmed) {
        this.userService.unlockUserByAdmin(id).subscribe(next => {
            this.snackBar.open('Unlock account successfully!', 'Lock', {
              duration: 2000,
            });
            this.onSubmit(this.pageClicked);
          }, error => {
            this.snackBar.open('Error!', '', {
              duration: 4000,
            });
          }, () => {
          this.loading = false;
          }
        );
      }
    });
  }
}
