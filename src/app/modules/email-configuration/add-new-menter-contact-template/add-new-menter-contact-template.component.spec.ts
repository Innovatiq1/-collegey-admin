import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewMenterContactTemplateComponent } from './add-new-menter-contact-template.component';

describe('AddNewMenterContactTemplateComponent', () => {
  let component: AddNewMenterContactTemplateComponent;
  let fixture: ComponentFixture<AddNewMenterContactTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewMenterContactTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewMenterContactTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
