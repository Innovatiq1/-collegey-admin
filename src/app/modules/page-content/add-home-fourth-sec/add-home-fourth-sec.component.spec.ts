import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomeFourthSecComponent } from './add-home-fourth-sec.component';

describe('AddHomeFourthSecComponent', () => {
  let component: AddHomeFourthSecComponent;
  let fixture: ComponentFixture<AddHomeFourthSecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHomeFourthSecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHomeFourthSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
