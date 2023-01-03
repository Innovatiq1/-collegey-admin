import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomeFirstSectionComponent } from './add-home-first-section.component';

describe('AddHomeFirstSectionComponent', () => {
  let component: AddHomeFirstSectionComponent;
  let fixture: ComponentFixture<AddHomeFirstSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHomeFirstSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHomeFirstSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
