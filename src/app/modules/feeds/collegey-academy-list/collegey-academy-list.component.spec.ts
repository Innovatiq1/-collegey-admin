import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeyAcademyListComponent } from './collegey-academy-list.component';

describe('CollegeyAcademyListComponent', () => {
  let component: CollegeyAcademyListComponent;
  let fixture: ComponentFixture<CollegeyAcademyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegeyAcademyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeyAcademyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
