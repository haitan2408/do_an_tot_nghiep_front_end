import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationsUserComponent } from './recommendations-user.component';

describe('RecommendationsUserComponent', () => {
  let component: RecommendationsUserComponent;
  let fixture: ComponentFixture<RecommendationsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendationsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
