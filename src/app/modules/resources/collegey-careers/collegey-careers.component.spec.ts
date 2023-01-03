import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeyCareersComponent } from './collegey-careers.component';

describe('CollegeyCareersComponent', () => {
  let component: CollegeyCareersComponent;
  let fixture: ComponentFixture<CollegeyCareersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegeyCareersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeyCareersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
