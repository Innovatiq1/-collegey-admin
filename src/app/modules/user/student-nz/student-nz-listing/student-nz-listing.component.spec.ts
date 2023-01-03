import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNzListingComponent } from './student-nz-listing.component';

describe('StudentNzListingComponent', () => {
  let component: StudentNzListingComponent;
  let fixture: ComponentFixture<StudentNzListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentNzListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentNzListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
