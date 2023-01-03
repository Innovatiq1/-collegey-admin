import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardofAdvisorsListingComponent } from './boardof-advisors-listing.component';

describe('BoardofAdvisorsListingComponent', () => {
  let component: BoardofAdvisorsListingComponent;
  let fixture: ComponentFixture<BoardofAdvisorsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardofAdvisorsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardofAdvisorsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
