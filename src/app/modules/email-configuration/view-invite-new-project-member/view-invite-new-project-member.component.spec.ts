import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInviteNewProjectMemberComponent } from './view-invite-new-project-member.component';

describe('ViewInviteNewProjectMemberComponent', () => {
  let component: ViewInviteNewProjectMemberComponent;
  let fixture: ComponentFixture<ViewInviteNewProjectMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInviteNewProjectMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInviteNewProjectMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
