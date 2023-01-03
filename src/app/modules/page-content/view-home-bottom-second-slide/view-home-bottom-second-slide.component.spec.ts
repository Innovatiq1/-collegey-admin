import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHomeBottomSecondSlideComponent } from './view-home-bottom-second-slide.component';

describe('ViewHomeBottomSecondSlideComponent', () => {
  let component: ViewHomeBottomSecondSlideComponent;
  let fixture: ComponentFixture<ViewHomeBottomSecondSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHomeBottomSecondSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHomeBottomSecondSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
