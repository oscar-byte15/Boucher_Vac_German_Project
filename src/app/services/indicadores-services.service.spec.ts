import { TestBed } from '@angular/core/testing';

import { IndicadoresServices} from './indicadores-services.service';

describe('IndicadoresServicesService', () => {
  let service: IndicadoresServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicadoresServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
