import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignBadgeComponent } from './assign-badge.component';

describe('AssignBadgeComponent', () => {
  let component: AssignBadgeComponent;
  let fixture: ComponentFixture<AssignBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
