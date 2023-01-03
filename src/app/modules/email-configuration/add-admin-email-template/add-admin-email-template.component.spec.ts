import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminEmailTemplateComponent } from './add-admin-email-template.component';

describe('AddAdminEmailTemplateComponent', () => {
  let component: AddAdminEmailTemplateComponent;
  let fixture: ComponentFixture<AddAdminEmailTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdminEmailTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminEmailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
