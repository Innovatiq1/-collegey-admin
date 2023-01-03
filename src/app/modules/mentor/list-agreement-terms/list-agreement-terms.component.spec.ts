import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAgreementTermsComponent } from './list-agreement-terms.component';

describe('ListAgreementTermsComponent', () => {
  let component: ListAgreementTermsComponent;
  let fixture: ComponentFixture<ListAgreementTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAgreementTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAgreementTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
