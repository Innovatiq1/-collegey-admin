import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHomeThirdSectionComponent } from './view-home-third-section.component';

describe('ViewHomeThirdSectionComponent', () => {
  let component: ViewHomeThirdSectionComponent;
  let fixture: ComponentFixture<ViewHomeThirdSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHomeThirdSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHomeThirdSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
