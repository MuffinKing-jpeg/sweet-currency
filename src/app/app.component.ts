import {Component, OnInit} from '@angular/core';
import {ThemeService} from "./services/theme.service";
import {CurrencyFetchService} from "./services/currency-fetch.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'sweet-currency';
    description = 'Made with love, by';
    author = 'MuffinKing-jpeg';
    gitLink = 'https://github.com/MuffinKing-jpeg'

    constructor(
        private fetchCurrency: CurrencyFetchService,
        private themeService: ThemeService) {
    }

    ngOnInit() {
        this.themeService.checkTheme();
        this.fetchCurrency.fetchAll();
    }
}
