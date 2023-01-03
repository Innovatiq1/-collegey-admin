import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundInComponent } from './fund-in.component';

describe('FundInComponent', () => {
  let component: FundInComponent;
  let fixture: ComponentFixture<FundInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
