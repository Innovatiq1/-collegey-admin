import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMentorarticleComponent } from './view-mentorarticle.component';

describe('ViewMentorarticleComponent', () => {
  let component: ViewMentorarticleComponent;
  let fixture: ComponentFixture<ViewMentorarticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMentorarticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMentorarticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
