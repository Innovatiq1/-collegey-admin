import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerWithListComponent } from './partner-with-list.component';

describe('PartnerWithListComponent', () => {
  let component: PartnerWithListComponent;
  let fixture: ComponentFixture<PartnerWithListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerWithListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerWithListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
