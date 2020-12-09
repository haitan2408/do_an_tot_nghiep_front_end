import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLockUserComponent } from './confirm-lock-user.component';

describe('ConfirmLockUserComponent', () => {
  let component: ConfirmLockUserComponent;
  let fixture: ComponentFixture<ConfirmLockUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmLockUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmLockUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
