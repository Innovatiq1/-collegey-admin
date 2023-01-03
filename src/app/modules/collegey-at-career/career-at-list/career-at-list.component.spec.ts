import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerAtListComponent } from './career-at-list.component';

describe('CareerAtListComponent', () => {
  let component: CareerAtListComponent;
  let fixture: ComponentFixture<CareerAtListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerAtListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerAtListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
