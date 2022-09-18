import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CalculatorWrapperComponent} from './calculator-wrapper.component';

describe('CalculatorComponent', () => {
    let component: CalculatorWrapperComponent;
    let fixture: ComponentFixture<CalculatorWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CalculatorWrapperComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CalculatorWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
