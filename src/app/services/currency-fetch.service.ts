import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BankCurrency, CurrencyInterface, iMono, iNBU, iPrivat} from "../interfaces/currency.interface";
import {number} from "currency-codes"


@Injectable({
    providedIn: 'root'
})
export class CurrencyFetchService {
    nbuUrl = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
    monoUrl = 'https://api.monobank.ua/bank/currency';
    privatUrl1 = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
    privatUrl2 = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=4';
    data: BankCurrency[] = [];

    constructor(
        private http: HttpClient,
    ) {
    }

    loadRates(): void {
        if (localStorage.getItem('exchange-rate')) {
            if (localStorage.getItem('update-time')) {
                const storageTime = localStorage.getItem('update-time')
                const cached = storageTime && new Date(+storageTime).getDay()
                const today = new Date(Date.now()).getDay();
                cached !== today ? this.fetchAll() : this.data = this.loadFromCache();
            } else this.fetchAll();
        } else this.fetchAll();
    }

    fetchAll(): void {
        Promise.all([this.getNBU(), this.getMono(), this.getPrivat()]).then(res => {
            localStorage.setItem('exchange-rate', JSON.stringify(res));
            localStorage.setItem('update-time', Date.now().toString());
            this.data = res;
        });


    }

    private loadFromCache(): BankCurrency[] {
        const localRawData = localStorage.getItem('exchange-rate')
        return localRawData && JSON.parse(localRawData)
    }

    private fetchBank(url: string): Observable<object[]> {
        return this.http.get<object[]>(url)
    }

    private getNBU(): Promise<BankCurrency> {
        return new Promise(resolve => {
            this.fetchBank(this.nbuUrl)
                .subscribe({
                        next: (res: any) => {
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
                                name: 'NBU',
                                data: data,
                            });
                        },
                        error: (error) => {
                            resolve({
                                name: 'NBU',
                                data: null,
                                msg: error.message
                            })
                        }
                    }
                )
        })
    }

    private getMono(): Promise<BankCurrency> {
        return new Promise(resolve => {
            this.fetchBank(this.monoUrl)
                .subscribe(
                    {
                        next: (res) => {
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
                        }
                        ,
                        error: (error) => {

                            resolve({
                                name: 'MonoBank',
                                data: null,
                                msg: error.message
                            })
                        }
                    }
                )
        })
    }

    private getPrivat(): Promise<BankCurrency> {
        return new Promise((resolve) => {
                this.fetchBank(this.privatUrl1)
                    .subscribe((res: any) => {
                            let data: CurrencyInterface[] = [];
                            res.forEach((e: iPrivat) => {
                                    if (e.base_ccy === 'UAH') {
                                        data.push({
                                            cc: e.ccy,
                                            rate: (+e.buy + +e.sale) / 2,
                                            rateBuy: +e.buy,
                                            rateSale: +e.sale,
                                        })
                                    }
                                    this.fetchBank(this.privatUrl2)
                                        .subscribe({
                                                next: (res: any) => {
                                                    res.forEach((e: iPrivat) => {
                                                        if (e.base_ccy === 'UAH') {
                                                            data.push({
                                                                cc: e.ccy,
                                                                rate: (+e.buy + +e.sale) / 2,
                                                                rateBuy: +e.buy,
                                                                rateSale: +e.sale,
                                                            })
                                                        }
                                                    })
                                                    resolve({
                                                        name: 'Privat24',
                                                        data: data
                                                    });
                                                },
                                                error: (error) => {
                                                    resolve({
                                                            name: 'Privat24',
                                                            data: null,
                                                            msg: error.message
                                                        }
                                                    )
                                                }
                                            }
                                        )
                                }
                            )
                        }
                    )
            }
        )
    }
}
