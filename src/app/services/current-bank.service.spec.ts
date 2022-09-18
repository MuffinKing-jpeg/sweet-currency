import { TestBed } from '@angular/core/testing';

import { CurrentBankService } from './current-bank.service';

describe('CurrentBankService', () => {
  let service: CurrentBankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentBankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
