import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeyGroupListComponent } from './collegey-group-list.component';

describe('CollegeyGroupListComponent', () => {
  let component: CollegeyGroupListComponent;
  let fixture: ComponentFixture<CollegeyGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegeyGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeyGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
