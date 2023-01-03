import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCollegyPartnerSecComponent } from './view-collegy-partner-sec.component';

describe('ViewCollegyPartnerSecComponent', () => {
  let component: ViewCollegyPartnerSecComponent;
  let fixture: ComponentFixture<ViewCollegyPartnerSecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCollegyPartnerSecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCollegyPartnerSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
