import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomeBottomFirstSlideComponent } from './add-home-bottom-first-slide.component';

describe('AddHomeBottomFirstSlideComponent', () => {
  let component: AddHomeBottomFirstSlideComponent;
  let fixture: ComponentFixture<AddHomeBottomFirstSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHomeBottomFirstSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHomeBottomFirstSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
