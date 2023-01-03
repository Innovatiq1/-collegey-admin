import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementTermsComponent } from './agreement-terms.component';

describe('AgreementTermsComponent', () => {
  let component: AgreementTermsComponent;
  let fixture: ComponentFixture<AgreementTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
