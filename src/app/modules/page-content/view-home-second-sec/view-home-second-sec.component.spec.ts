import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHomeSecondSecComponent } from './view-home-second-sec.component';

describe('ViewHomeSecondSecComponent', () => {
  let component: ViewHomeSecondSecComponent;
  let fixture: ComponentFixture<ViewHomeSecondSecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHomeSecondSecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHomeSecondSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
