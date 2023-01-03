import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMentorRequestSubmitComponent } from './view-mentor-request-submit.component';

describe('ViewMentorRequestSubmitComponent', () => {
  let component: ViewMentorRequestSubmitComponent;
  let fixture: ComponentFixture<ViewMentorRequestSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMentorRequestSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMentorRequestSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
