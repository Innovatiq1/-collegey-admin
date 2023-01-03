import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHomeFourthSectionComponent } from './view-home-fourth-section.component';

describe('ViewHomeFourthSectionComponent', () => {
  let component: ViewHomeFourthSectionComponent;
  let fixture: ComponentFixture<ViewHomeFourthSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHomeFourthSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHomeFourthSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
