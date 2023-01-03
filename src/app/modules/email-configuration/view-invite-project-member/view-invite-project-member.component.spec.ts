import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInviteProjectMemberComponent } from './view-invite-project-member.component';

describe('ViewInviteProjectMemberComponent', () => {
  let component: ViewInviteProjectMemberComponent;
  let fixture: ComponentFixture<ViewInviteProjectMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInviteProjectMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInviteProjectMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
