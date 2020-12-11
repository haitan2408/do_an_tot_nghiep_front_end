import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthJwtService} from '../../../auth/auth-jwt.service';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {Router} from '@angular/router';
import {AuthLoginInfo} from '../../../auth/login-info';
import {UserComponent} from '../user.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  loginForm: FormGroup;
  submitted: boolean = false;
  userInfo: AuthLoginInfo;
  constructor(private auth: AuthJwtService, private fb: FormBuilder,
              private tokenStorage: TokenStorageService, private router: Router, private userComponent: UserComponent,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    this.submitted = true;
    this.userInfo = new AuthLoginInfo(this.femail.value, this.fpassword.value);
    this.login(this.userInfo);
  }

  get femail() {
    return this.loginForm.get('email');
  }
  get fpassword() {
    return this.loginForm.get('password');
  }
  public login(userInfo) {
    this.loading = true;
    this.auth.attemptAuth(userInfo).subscribe(
      data => {
        this.tokenStorage.saveAuthorities(data.authorities)
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveEmail(data.email);
        if(this.tokenStorage.getAuthorities().indexOf("ROLE_ADMIN")!=-1) {
          this.router.navigateByUrl("/admin/post")
        }else {
          this.router.navigateByUrl("/");
          this.userComponent.ngOnInit();
        }
        this.loading = false;
      },
      error => {
        this.snackBar.open('Sai tài khoản hoặc mật khẩu!', '', {
          duration: 4000,
        });
        this.loading = false;
      }, () => {
        this.loading = false;
      }
    );

  }

}
