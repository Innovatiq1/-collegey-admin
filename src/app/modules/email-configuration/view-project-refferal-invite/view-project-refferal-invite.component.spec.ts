import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectRefferalInviteComponent } from './view-project-refferal-invite.component';

describe('ViewProjectRefferalInviteComponent', () => {
  let component: ViewProjectRefferalInviteComponent;
  let fixture: ComponentFixture<ViewProjectRefferalInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProjectRefferalInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectRefferalInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
