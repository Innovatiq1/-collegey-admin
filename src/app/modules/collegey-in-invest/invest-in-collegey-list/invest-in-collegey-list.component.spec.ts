import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestInCollegeyListComponent } from './invest-in-collegey-list.component';

describe('InvestInCollegeyListComponent', () => {
  let component: InvestInCollegeyListComponent;
  let fixture: ComponentFixture<InvestInCollegeyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestInCollegeyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestInCollegeyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
