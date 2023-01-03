import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInviteNewProjectMemberComponent } from './add-invite-new-project-member.component';

describe('AddInviteNewProjectMemberComponent', () => {
  let component: AddInviteNewProjectMemberComponent;
  let fixture: ComponentFixture<AddInviteNewProjectMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInviteNewProjectMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInviteNewProjectMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
