import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqListingComponent } from './faq-listing.component';

describe('FaqListingComponent', () => {
  let component: FaqListingComponent;
  let fixture: ComponentFixture<FaqListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
