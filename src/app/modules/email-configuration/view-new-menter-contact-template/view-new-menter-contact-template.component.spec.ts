import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNewMenterContactTemplateComponent } from './view-new-menter-contact-template.component';

describe('ViewNewMenterContactTemplateComponent', () => {
  let component: ViewNewMenterContactTemplateComponent;
  let fixture: ComponentFixture<ViewNewMenterContactTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewNewMenterContactTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNewMenterContactTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
