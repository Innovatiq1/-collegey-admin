import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailinviteComponent } from './emailinvite.component';

describe('EmailinviteComponent', () => {
  let component: EmailinviteComponent;
  let fixture: ComponentFixture<EmailinviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailinviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailinviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
