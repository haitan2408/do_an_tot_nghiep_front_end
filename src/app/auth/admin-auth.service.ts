import {Injectable} from '@angular/core';
import {TokenStorageService} from './token-storage.service';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService, private router: Router, private matSnackBar: MatSnackBar) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.tokenStorageService.getToken();


    if (token == null) {
      this.router.navigateByUrl('/login');
      return false;
    } else if (!token || !this.isRole()) {
      this.router.navigateByUrl('/');
      this.matSnackBar.open('You do not permission to Admin Page', '403', {
        duration: 4000,
      });
      return false;
    } else {
      return true;
    }
  }
  isRole() {
    const tokenPayload = this.tokenStorageService.getAuthorities();
    for(let role of tokenPayload) {
      if(role =="ROLE_ADMIN") {
        return true;
      }
    }
    return false
  }

}
