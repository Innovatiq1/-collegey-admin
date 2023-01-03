import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewForgetPasswordTemplateComponent } from './view-forget-password-template.component';

describe('ViewForgetPasswordTemplateComponent', () => {
  let component: ViewForgetPasswordTemplateComponent;
  let fixture: ComponentFixture<ViewForgetPasswordTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewForgetPasswordTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewForgetPasswordTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
