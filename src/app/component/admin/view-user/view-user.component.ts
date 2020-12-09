import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  user: any;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.user = data;
  }
  ngOnInit() {
  }

}
