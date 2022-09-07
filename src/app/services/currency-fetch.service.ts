import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {bankCurrency, CurrencyInterface, iMono, iNBU, iPrivat} from "../interfaces/currency.interface";
import {number} from "currency-codes"


@Injectable({
    providedIn: 'root'
})
export class CurrencyFetchService {
    nbuUrl = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
    monoUrl = 'https://api.monobank.ua/bank/currency';
    privatUrl = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';


    constructor(
        private http: HttpClient,
    ) {
    }

    fetchAll(): any {
        return Promise.all([this.getNBU(), this.getMono(), this.getPrivat()])
    }

    fetchBank(url: string): Observable<iNBU | iPrivat | iMono> {
        return this.http.get<iNBU | iPrivat | iMono>(url)
    }

    private getNBU(): Promise<any> {
        return new Promise(resolve => {
            this.fetchBank(this.nbuUrl)
                .subscribe((res: any) => {
                    let response: bankCurrency;
                    let data: CurrencyInterface[] = [];

                    res.forEach((e: iNBU) => {
                        data.push({
                            cc: e.cc,
                            rate: e.rate,
                            rateBuy: e.rate,
                            rateSale: e.rate,
                        })
                    })

                    response = {
                        name: 'НБУ',
                        data: data
                    }
                    resolve(response);
                })
        })
    }

    private getMono(): Promise<any> {
        return new Promise(resolve => {
            this.fetchBank(this.monoUrl)
                .subscribe((res: any) => {
                    let response: bankCurrency;
                    let data: CurrencyInterface[] = [];

                    res.forEach((e: iMono) => {
                        if (e.currencyCodeB === 980) {
                            data.push({
                                cc: number(`${e.currencyCodeA}`)?.code,
                                rate: e.rateBuy && e.rateSell ? (e.rateBuy + e.rateSell) / 2 : e.rateCross,
                                rateBuy: e.rateBuy ? e.rateBuy : e.rateCross,
                                rateSale: e.rateSell ? e.rateSell : e.rateCross,
                            })
                        }
                    })

                    response = {
                        name: 'MonoBank',
                        data: data
                    }
                    resolve(response);
                })
        })
    }

    private getPrivat(): Promise<any> {
        return new Promise((resolve) => {
            this.fetchBank(this.privatUrl)
                .subscribe((res: any) => {
                    let response: bankCurrency;
                    let data: CurrencyInterface[] = [];

                    res.forEach((e: iPrivat) => {
                        if (e.base_ccy === 'UAH') {
                            data.push({
                                cc: e.ccy,
                                rate: (e.buy + e.sale) / 2,
                                rateBuy: e.buy,
                                rateSale: e.sale,
                            })
                        }
                    })

                    response = {
                        name: 'Privat24',
                        data: data
                    }
                    resolve(response);
                })
        })
    }
}
