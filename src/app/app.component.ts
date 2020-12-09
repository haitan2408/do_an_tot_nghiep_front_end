import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {TokenStorageService} from './auth/token-storage.service';
import {PostComponent} from './component/user/post/post.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor() {
  }

  ngOnInit(): void {
  }

}
