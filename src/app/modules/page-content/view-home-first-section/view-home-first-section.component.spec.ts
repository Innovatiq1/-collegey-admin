import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHomeFirstSectionComponent } from './view-home-first-section.component';

describe('ViewHomeFirstSectionComponent', () => {
  let component: ViewHomeFirstSectionComponent;
  let fixture: ComponentFixture<ViewHomeFirstSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHomeFirstSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHomeFirstSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
