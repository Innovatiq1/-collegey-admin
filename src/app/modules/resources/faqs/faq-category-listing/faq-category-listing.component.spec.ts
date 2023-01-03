import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqCategoryListingComponent } from './faq-category-listing.component';

describe('FaqCategoryListingComponent', () => {
  let component: FaqCategoryListingComponent;
  let fixture: ComponentFixture<FaqCategoryListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqCategoryListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqCategoryListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
