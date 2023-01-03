import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberRefferedTemplateComponent } from './add-member-reffered-template.component';

describe('AddMemberRefferedTemplateComponent', () => {
  let component: AddMemberRefferedTemplateComponent;
  let fixture: ComponentFixture<AddMemberRefferedTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMemberRefferedTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberRefferedTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
