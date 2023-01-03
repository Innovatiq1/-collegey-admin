import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInviteProjectMemberComponent } from './add-invite-project-member.component';

describe('AddInviteProjectMemberComponent', () => {
  let component: AddInviteProjectMemberComponent;
  let fixture: ComponentFixture<AddInviteProjectMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInviteProjectMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInviteProjectMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
