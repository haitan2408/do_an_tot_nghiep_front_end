import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommentAdminComponent } from './view-comment-admin.component';

describe('ViewCommentAdminComponent', () => {
  let component: ViewCommentAdminComponent;
  let fixture: ComponentFixture<ViewCommentAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCommentAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCommentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
