import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-view-post-admin',
  templateUrl: './view-post-admin.component.html',
  styleUrls: ['./view-post-admin.component.css']
})
export class ViewPostAdminComponent implements OnInit {
  post: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.post = data;
  }

  ngOnInit() {
  }

}
