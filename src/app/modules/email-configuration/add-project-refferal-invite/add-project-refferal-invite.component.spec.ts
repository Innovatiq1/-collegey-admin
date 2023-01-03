import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectRefferalInviteComponent } from './add-project-refferal-invite.component';

describe('AddProjectRefferalInviteComponent', () => {
  let component: AddProjectRefferalInviteComponent;
  let fixture: ComponentFixture<AddProjectRefferalInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectRefferalInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectRefferalInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
