import { TestBed } from '@angular/core/testing';

import { EmpresasCatalogoService } from './empresas-catalogo.service';

describe('EmpresasCatalogoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpresasCatalogoService = TestBed.get(EmpresasCatalogoService);
    expect(service).toBeTruthy();
  });
});
