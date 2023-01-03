import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInviteUserRejectTemplateComponent } from './view-invite-user-reject-template.component';

describe('ViewInviteUserRejectTemplateComponent', () => {
  let component: ViewInviteUserRejectTemplateComponent;
  let fixture: ComponentFixture<ViewInviteUserRejectTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInviteUserRejectTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInviteUserRejectTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
