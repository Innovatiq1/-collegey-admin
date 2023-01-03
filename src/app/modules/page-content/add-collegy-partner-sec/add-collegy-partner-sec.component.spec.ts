import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollegyPartnerSecComponent } from './add-collegy-partner-sec.component';

describe('AddCollegyPartnerSecComponent', () => {
  let component: AddCollegyPartnerSecComponent;
  let fixture: ComponentFixture<AddCollegyPartnerSecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCollegyPartnerSecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCollegyPartnerSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
