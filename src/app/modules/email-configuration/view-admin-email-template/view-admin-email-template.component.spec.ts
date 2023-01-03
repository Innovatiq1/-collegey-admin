import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdminEmailTemplateComponent } from './view-admin-email-template.component';

describe('ViewAdminEmailTemplateComponent', () => {
  let component: ViewAdminEmailTemplateComponent;
  let fixture: ComponentFixture<ViewAdminEmailTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAdminEmailTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAdminEmailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
