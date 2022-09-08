import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CurrencyInterface, iMono, iNBU, iPrivat} from "../interfaces/currency.interface";
import {number} from "currency-codes"


@Injectable({
    providedIn: 'root'
})
export class CurrencyFetchService {
    nbuUrl = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
    monoUrl = 'https://api.monobank.ua/bank/currency';
    privatUrl = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
    data = this.loadFromCache();

    constructor(
        private http: HttpClient,
    ) {
    }

    // @ts-ignore
    getBanksList(): object[] {
    }

    loadRates(): void {
        if (localStorage.getItem('exchange-rate')) {
            if (localStorage.getItem('update-time')) {
                const storageTime = localStorage.getItem('update-time')
                const cached = storageTime && new Date(+storageTime).getDay()
                const today = new Date(Date.now()).getDay();
                if (cached !== today) {
                    this.fetchAll()
                }
            } else this.fetchAll();
        } else this.fetchAll();
    }

    fetchAll(): void {
        Promise.all([this.getNBU(), this.getMono(), this.getPrivat()]).then(res => {
            localStorage.setItem('exchange-rate', JSON.stringify(res));
            localStorage.setItem('update-time', Date.now().toString());
        });


    }

    private loadFromCache(): object[] {
        this.loadRates();

        const localRawData = localStorage.getItem('exchange-rate')
        console.log(localRawData && JSON.parse(localRawData))
        return localRawData && JSON.parse(localRawData)
    }

    private fetchBank(url: string): Observable<object[]> {
        return this.http.get<object[]>(url)
    }

    private getNBU(): Promise<any> {
        return new Promise(resolve => {
            this.fetchBank(this.nbuUrl)
                .subscribe(
                    (res: any) => {
                        let data: CurrencyInterface[] = [];

                        res.forEach((e: iNBU) => {
                            data.push({
                                cc: e.cc,
                                rate: e.rate,
                                rateBuy: e.rate,
                                rateSale: e.rate,
                            })
                        })

                        resolve({
                            name: 'НБУ',
                            data: data,
                        });
                    },
                    (error) => {
                        resolve({
                            name: 'НБУ',
                            data: null,
                            msg: error.message
                        })
                    })
        })
    }

    private getMono(): Promise<any> {
        return new Promise(resolve => {
            this.fetchBank(this.monoUrl)
                .subscribe((res) => {
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


                        resolve({
                            name: 'MonoBank',
                            data: data
                        });
                    },
                    (error) => {

                        resolve({
                            name: 'MonoBank',
                            data: null,
                            msg: error.message
                        })
                    })
        })
    }

    private getPrivat(): Promise<any> {
        return new Promise((resolve) => {
            this.fetchBank(this.privatUrl)
                .subscribe((res: any) => {
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
                        resolve({
                            name: 'Privat24',
                            data: data
                        });
                    },
                    (error) => {
                        resolve({
                            name: 'Privat24',
                            data: null,
                            msg: error.message
                        })
                    })
        })
    }
}
