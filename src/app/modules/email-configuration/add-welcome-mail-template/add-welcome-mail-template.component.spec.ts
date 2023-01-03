import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWelcomeMailTemplateComponent } from './add-welcome-mail-template.component';

describe('AddWelcomeMailTemplateComponent', () => {
  let component: AddWelcomeMailTemplateComponent;
  let fixture: ComponentFixture<AddWelcomeMailTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWelcomeMailTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWelcomeMailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
