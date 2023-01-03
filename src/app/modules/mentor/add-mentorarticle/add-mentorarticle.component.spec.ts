import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMentorarticleComponent } from './add-mentorarticle.component';

describe('AddMentorarticleComponent', () => {
  let component: AddMentorarticleComponent;
  let fixture: ComponentFixture<AddMentorarticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMentorarticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMentorarticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
