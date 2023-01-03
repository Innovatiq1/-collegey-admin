import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramEnrollmentListingComponent } from './program-enrollment-listing.component';

describe('ProgramEnrollmentListingComponent', () => {
  let component: ProgramEnrollmentListingComponent;
  let fixture: ComponentFixture<ProgramEnrollmentListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramEnrollmentListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramEnrollmentListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
