import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMentorAcceptProjectInviteStatusComponent } from './view-mentor-accept-project-invite-status.component';

describe('ViewMentorAcceptProjectInviteStatusComponent', () => {
  let component: ViewMentorAcceptProjectInviteStatusComponent;
  let fixture: ComponentFixture<ViewMentorAcceptProjectInviteStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMentorAcceptProjectInviteStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMentorAcceptProjectInviteStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
