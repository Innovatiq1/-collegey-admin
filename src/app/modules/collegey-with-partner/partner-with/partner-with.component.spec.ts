import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerWithComponent } from './partner-with.component';

describe('PartnerWithComponent', () => {
  let component: PartnerWithComponent;
  let fixture: ComponentFixture<PartnerWithComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerWithComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerWithComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
