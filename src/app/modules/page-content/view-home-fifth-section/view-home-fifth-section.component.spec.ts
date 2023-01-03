import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHomeFifthSectionComponent } from './view-home-fifth-section.component';

describe('ViewHomeFifthSectionComponent', () => {
  let component: ViewHomeFifthSectionComponent;
  let fixture: ComponentFixture<ViewHomeFifthSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHomeFifthSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHomeFifthSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
