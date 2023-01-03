import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNewWaitlistComponent } from './view-new-waitlist.component';

describe('ViewNewWaitlistComponent', () => {
  let component: ViewNewWaitlistComponent;
  let fixture: ComponentFixture<ViewNewWaitlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewNewWaitlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNewWaitlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
