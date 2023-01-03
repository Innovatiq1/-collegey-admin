import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardofDirectorsListingComponent } from './boardof-directors-listing.component';

describe('BoardofDirectorsListingComponent', () => {
  let component: BoardofDirectorsListingComponent;
  let fixture: ComponentFixture<BoardofDirectorsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardofDirectorsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardofDirectorsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
