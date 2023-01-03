import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomeBottomSecondSlideComponent } from './add-home-bottom-second-slide.component';

describe('AddHomeBottomSecondSlideComponent', () => {
  let component: AddHomeBottomSecondSlideComponent;
  let fixture: ComponentFixture<AddHomeBottomSecondSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHomeBottomSecondSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHomeBottomSecondSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
