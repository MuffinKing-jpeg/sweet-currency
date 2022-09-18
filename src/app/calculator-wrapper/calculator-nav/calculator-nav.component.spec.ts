import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorNavComponent } from './calculator-nav.component';

describe('CalculatorNavComponent', () => {
  let component: CalculatorNavComponent;
  let fixture: ComponentFixture<CalculatorNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
