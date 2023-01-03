import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeyPartnerComponent } from './collegey-partner.component';

describe('CollegeyPartnerComponent', () => {
  let component: CollegeyPartnerComponent;
  let fixture: ComponentFixture<CollegeyPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegeyPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeyPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
