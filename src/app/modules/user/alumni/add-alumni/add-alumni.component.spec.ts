import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlumniComponent } from './add-alumni.component';

describe('AddAlumniComponent', () => {
  let component: AddAlumniComponent;
  let fixture: ComponentFixture<AddAlumniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAlumniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlumniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
