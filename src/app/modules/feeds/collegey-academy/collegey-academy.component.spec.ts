import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeyAcademyComponent } from './collegey-academy.component';

describe('CollegeyAcademyComponent', () => {
  let component: CollegeyAcademyComponent;
  let fixture: ComponentFixture<CollegeyAcademyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegeyAcademyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeyAcademyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
