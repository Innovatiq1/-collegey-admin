import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestInComponent } from './invest-in.component';

describe('InvestInComponent', () => {
  let component: InvestInComponent;
  let fixture: ComponentFixture<InvestInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
