import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundInListComponent } from './fund-in-list.component';

describe('FundInListComponent', () => {
  let component: FundInListComponent;
  let fixture: ComponentFixture<FundInListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundInListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
