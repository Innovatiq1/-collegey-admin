import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCounsellorsComponent } from './add-counsellors.component';

describe('AddCounsellorsComponent', () => {
  let component: AddCounsellorsComponent;
  let fixture: ComponentFixture<AddCounsellorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCounsellorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCounsellorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
