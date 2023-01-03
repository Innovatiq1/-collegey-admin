import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomeFooterDataComponent } from './add-home-footer-data.component';

describe('AddHomeFooterDataComponent', () => {
  let component: AddHomeFooterDataComponent;
  let fixture: ComponentFixture<AddHomeFooterDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHomeFooterDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHomeFooterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
