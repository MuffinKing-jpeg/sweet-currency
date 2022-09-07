export interface CurrencyInterface {
    cc?: string,
    rate?: number,
    rateBuy?: number,
    rateSale?: number,
}

export interface bankCurrency {
    name: string,
    data: CurrencyInterface[]
}

export interface iPrivat {
    ccy: string,
    base_ccy: string,
    buy: number,
    sale: number,
}

export interface iNBU {
    r030: number,
    txt: string,
    rate: number,
    cc: string,
    exchangedate: string,
}

export interface iMono {
    currencyCodeA: number,
    currencyCodeB: number,
    date: number,
    rateBuy?: number,
    rateSell?: number,
    rateCross?: number,
}
