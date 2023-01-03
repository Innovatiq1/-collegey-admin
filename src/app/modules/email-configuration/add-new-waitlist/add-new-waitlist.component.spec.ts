import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewWaitlistComponent } from './add-new-waitlist.component';

describe('AddNewWaitlistComponent', () => {
  let component: AddNewWaitlistComponent;
  let fixture: ComponentFixture<AddNewWaitlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewWaitlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewWaitlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
