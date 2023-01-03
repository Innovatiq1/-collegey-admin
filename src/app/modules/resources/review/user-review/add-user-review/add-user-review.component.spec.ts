import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserReviewComponent } from './add-user-review.component';

describe('AddUserReviewComponent', () => {
  let component: AddUserReviewComponent;
  let fixture: ComponentFixture<AddUserReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
