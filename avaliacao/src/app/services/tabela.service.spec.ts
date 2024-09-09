import { TestBed } from '@angular/core/testing';

import { TabelaService } from './tabela.service';

describe('TabelaService', () => {
  let service: TabelaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabelaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
