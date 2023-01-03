import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollegeReviewComponent } from './add-college-review.component';

describe('AddCollegeReviewComponent', () => {
  let component: AddCollegeReviewComponent;
  let fixture: ComponentFixture<AddCollegeReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCollegeReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCollegeReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
