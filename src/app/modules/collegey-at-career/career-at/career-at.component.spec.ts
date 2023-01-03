import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerAtComponent } from './career-at.component';

describe('CareerAtComponent', () => {
  let component: CareerAtComponent;
  let fixture: ComponentFixture<CareerAtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerAtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerAtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
