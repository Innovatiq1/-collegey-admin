import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssignBadgeComponent } from './add-assign-badge.component';

describe('AddAssignBadgeComponent', () => {
  let component: AddAssignBadgeComponent;
  let fixture: ComponentFixture<AddAssignBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssignBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssignBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
