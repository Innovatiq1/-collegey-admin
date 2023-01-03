import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSendProjectInvoiceComponent } from './view-send-project-invoice.component';

describe('ViewSendProjectInvoiceComponent', () => {
  let component: ViewSendProjectInvoiceComponent;
  let fixture: ComponentFixture<ViewSendProjectInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSendProjectInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSendProjectInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
