import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomeSixthSecComponent } from './add-home-sixth-sec.component';

describe('AddHomeSixthSecComponent', () => {
  let component: AddHomeSixthSecComponent;
  let fixture: ComponentFixture<AddHomeSixthSecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHomeSixthSecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHomeSixthSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
