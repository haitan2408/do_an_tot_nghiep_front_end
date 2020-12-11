import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecommendationRecordComponent } from './view-recommendation-record.component';

describe('ViewRecommendationRecordComponent', () => {
  let component: ViewRecommendationRecordComponent;
  let fixture: ComponentFixture<ViewRecommendationRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRecommendationRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRecommendationRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
