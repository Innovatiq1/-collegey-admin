import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDefaultBannerComponent } from './add-default-banner.component';

describe('AddDefaultBannerComponent', () => {
  let component: AddDefaultBannerComponent;
  let fixture: ComponentFixture<AddDefaultBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDefaultBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDefaultBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
