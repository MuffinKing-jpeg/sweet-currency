import {Component, OnInit} from '@angular/core';
import {CurrencyFetchService} from "../../services/currency-fetch.service";
import {CurrentBankService} from "../../services/current-bank.service";

@Component({
    selector: 'app-calculator-nav',
    templateUrl: './calculator-nav.component.html',
    styleUrls: ['./calculator-nav.component.scss']
})
export class CalculatorNavComponent implements OnInit {

    constructor(
        public state: CurrentBankService,
        public fetchCurrency: CurrencyFetchService,
        private loadCurrentBank: CurrentBankService
    ) {
    }

    ngOnInit(): void {
        this.loadCurrentBank.getRoute()
    }

    ngDoCheck(): void {
        const navElement = document.getElementById(this.state.currentId)
        const navElements = document.getElementsByClassName('nav-item')
        if (navElements) {
            for (let i = 0; i < navElements.length; i++) {
                navElements[i].classList.remove('active')
            }
        }

        navElement ? navElement.classList.add('active') : null


    }

}
