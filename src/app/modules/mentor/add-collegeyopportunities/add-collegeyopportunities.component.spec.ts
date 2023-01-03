import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollegeyopportunitiesComponent } from './add-collegeyopportunities.component';

describe('AddCollegeyopportunitiesComponent', () => {
  let component: AddCollegeyopportunitiesComponent;
  let fixture: ComponentFixture<AddCollegeyopportunitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCollegeyopportunitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCollegeyopportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
