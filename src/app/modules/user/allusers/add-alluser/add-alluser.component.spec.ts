import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlluserComponent } from './add-alluser.component';

describe('AddAlluserComponent', () => {
  let component: AddAlluserComponent;
  let fixture: ComponentFixture<AddAlluserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAlluserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlluserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
