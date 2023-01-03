import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInviteUserRejectTemplateComponent } from './add-invite-user-reject-template.component';

describe('AddInviteUserRejectTemplateComponent', () => {
  let component: AddInviteUserRejectTemplateComponent;
  let fixture: ComponentFixture<AddInviteUserRejectTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInviteUserRejectTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInviteUserRejectTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
