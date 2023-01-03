import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHomeBottomFirstSlideComponent } from './view-home-bottom-first-slide.component';

describe('ViewHomeBottomFirstSlideComponent', () => {
  let component: ViewHomeBottomFirstSlideComponent;
  let fixture: ComponentFixture<ViewHomeBottomFirstSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHomeBottomFirstSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHomeBottomFirstSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
