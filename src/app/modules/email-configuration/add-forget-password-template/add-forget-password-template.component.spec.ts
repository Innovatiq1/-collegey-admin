import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddForgetPasswordTemplateComponent } from './add-forget-password-template.component';

describe('AddForgetPasswordTemplateComponent', () => {
  let component: AddForgetPasswordTemplateComponent;
  let fixture: ComponentFixture<AddForgetPasswordTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddForgetPasswordTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddForgetPasswordTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
