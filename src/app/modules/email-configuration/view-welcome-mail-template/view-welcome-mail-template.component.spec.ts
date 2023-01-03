import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWelcomeMailTemplateComponent } from './view-welcome-mail-template.component';

describe('ViewWelcomeMailTemplateComponent', () => {
  let component: ViewWelcomeMailTemplateComponent;
  let fixture: ComponentFixture<ViewWelcomeMailTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewWelcomeMailTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWelcomeMailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
