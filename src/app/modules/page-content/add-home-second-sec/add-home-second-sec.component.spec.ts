import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomeSecondSecComponent } from './add-home-second-sec.component';

describe('AddHomeSecondSecComponent', () => {
  let component: AddHomeSecondSecComponent;
  let fixture: ComponentFixture<AddHomeSecondSecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHomeSecondSecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHomeSecondSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
