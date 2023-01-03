import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollegeyLogoComponent } from './add-collegey-logo.component';

describe('AddCollegeyLogoComponent', () => {
  let component: AddCollegeyLogoComponent;
  let fixture: ComponentFixture<AddCollegeyLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCollegeyLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCollegeyLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
