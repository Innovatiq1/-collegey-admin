import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUniversityComponent } from './new-university.component';

describe('NewUniversityComponent', () => {
  let component: NewUniversityComponent;
  let fixture: ComponentFixture<NewUniversityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUniversityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
