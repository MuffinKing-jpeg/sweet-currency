import {Component, OnInit} from '@angular/core';
import {CurrencyFetchService} from "../services/currency-fetch.service";

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

    constructor(public fetchCurrency: CurrencyFetchService) {

    }

    ngOnInit(): void {

    }

}
