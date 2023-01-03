import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeyLogoComponent } from './collegey-logo.component';

describe('CollegeyLogoComponent', () => {
  let component: CollegeyLogoComponent;
  let fixture: ComponentFixture<CollegeyLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegeyLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeyLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
