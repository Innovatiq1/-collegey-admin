import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjectFeesComponent } from './list-project-fees.component';

describe('ListProjectFeesComponent', () => {
  let component: ListProjectFeesComponent;
  let fixture: ComponentFixture<ListProjectFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProjectFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProjectFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
