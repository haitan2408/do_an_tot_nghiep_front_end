import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {NewPostComponent} from '../new-post/new-post.component';
import {ChangeAvatarComponent} from '../change-avatar/change-avatar.component';
import {error} from 'util';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  listPost = [];
  amountComment: number = 0;
  user = '';
  email = '';
  username="";
  loading= false;

  constructor(private userService: UserService, private snackBar: MatSnackBar, private router: Router,
              private dialog: MatDialog, private tokenStorageService: TokenStorageService, private route: ActivatedRoute
             ) {
  }

  ngOnInit() {
    this.loading = true;
    this.email = this.route.snapshot.params['email'];
    this.userService.getProfile(this.email).subscribe(data => {
      this.listPost = data;
      this.userService.getProfileInformation(this.email).subscribe(data=> {
        this.user = data;
      });
      for (let post of this.listPost) {
        this.amountComment += post.comments.length;
      }
    }, error => {
      this.snackBar.open('Not Found!', '', {
        duration: 3000,
      });
      this.router.navigateByUrl('/');
    }, ()=> {
      this.loading = false;
    });
    this.username = this.tokenStorageService.getUsername();
  }

   changeAvatar() {
    const dialogRef = this.dialog.open(ChangeAvatarComponent, {
      width: '30%',
      height: '90%',
      data: this.user
    });
    dialogRef.afterClosed().subscribe(async (confirmed: boolean) => {
      if(confirmed) {
        window.location.reload();
      }

    });
  }
  viewPost(id: number) {
    this.router.navigateByUrl('/view-post/' + id);
  }

  viewInformation() {
    this.router.navigateByUrl('view-information/'+this.email);
  }
}
