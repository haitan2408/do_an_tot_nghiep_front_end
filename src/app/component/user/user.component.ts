import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../auth/token-storage.service';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  title = 'front-end';
  username: string = "";
  constructor(private tokenStorageService: TokenStorageService, public dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.username = this.tokenStorageService.getUsername();
  }
  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  viewProfile() {
    this.router.navigateByUrl("view-profile/"+this.tokenStorageService.getEmail());
  }
}
