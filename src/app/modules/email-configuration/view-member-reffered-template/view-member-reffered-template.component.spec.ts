import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMemberRefferedTemplateComponent } from './view-member-reffered-template.component';

describe('ViewMemberRefferedTemplateComponent', () => {
  let component: ViewMemberRefferedTemplateComponent;
  let fixture: ComponentFixture<ViewMemberRefferedTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMemberRefferedTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMemberRefferedTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
