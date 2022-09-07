import {TestBed} from '@angular/core/testing';

import {CurrencyFetchService} from './currency-fetch.service';

describe('CurencyFetchService', () => {
    let service: CurrencyFetchService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CurrencyFetchService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
