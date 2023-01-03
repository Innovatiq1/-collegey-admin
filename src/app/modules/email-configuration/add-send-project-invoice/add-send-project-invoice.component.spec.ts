import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSendProjectInvoiceComponent } from './add-send-project-invoice.component';

describe('AddSendProjectInvoiceComponent', () => {
  let component: AddSendProjectInvoiceComponent;
  let fixture: ComponentFixture<AddSendProjectInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSendProjectInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSendProjectInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
