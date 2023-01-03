import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeyGroupPostComponent } from './collegey-group-post.component';

describe('CollegeyGroupPostComponent', () => {
  let component: CollegeyGroupPostComponent;
  let fixture: ComponentFixture<CollegeyGroupPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegeyGroupPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeyGroupPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
