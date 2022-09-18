import {Component, OnInit} from '@angular/core';
import {CurrencyFetchService} from "../services/currency-fetch.service";

@Component({
    selector: 'app-calculator-wrapper',
    templateUrl: './calculator-wrapper.component.html',
    styleUrls: ['./calculator-wrapper.component.scss']
})
export class CalculatorWrapperComponent implements OnInit {

    constructor(public fetchCurrency: CurrencyFetchService) {

    }

    ngOnInit(): void {

    }

}
