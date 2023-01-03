import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjectPaymentComponent } from './list-project-payment.component';

describe('ListProjectPaymentComponent', () => {
  let component: ListProjectPaymentComponent;
  let fixture: ComponentFixture<ListProjectPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProjectPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProjectPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
