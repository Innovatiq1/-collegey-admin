import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFreeProjectJoiningComponent } from './view-free-project-joining.component';

describe('ViewFreeProjectJoiningComponent', () => {
  let component: ViewFreeProjectJoiningComponent;
  let fixture: ComponentFixture<ViewFreeProjectJoiningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFreeProjectJoiningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFreeProjectJoiningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
