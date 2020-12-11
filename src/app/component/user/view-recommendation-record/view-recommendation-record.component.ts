import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-view-recommendation-record',
  templateUrl: './view-recommendation-record.component.html',
  styleUrls: ['./view-recommendation-record.component.css']
})
export class ViewRecommendationRecordComponent implements OnInit {

  listRecord=[];
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.listRecord = data;
  }

  ngOnInit() {
  }

}
