import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {CurrencyFetchService} from "../../services/currency-fetch.service";

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

    public currentBank!: any;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private currencyFetch: CurrencyFetchService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
    }

    ngDoCheck(): void {
        const current = this.route.snapshot.paramMap.get('bank');
        const currentId = this.currencyFetch.data.findIndex(({name}) => name === current)
        this.currentBank = current;
        if (currentId === undefined || currentId === -1) this.router.navigate(['/404']).catch(err => console.error(err))

        //TODO: Prevent reroute to 404 when cache not loaded
    }

}
