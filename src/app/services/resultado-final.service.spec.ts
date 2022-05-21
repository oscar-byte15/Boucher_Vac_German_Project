import { TestBed } from '@angular/core/testing';

import { ResultadoFinalService } from './resultado-final.service';

describe('ResultadoFinalService', () => {
  let service: ResultadoFinalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultadoFinalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
