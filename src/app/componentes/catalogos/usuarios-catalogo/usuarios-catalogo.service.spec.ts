import { TestBed } from '@angular/core/testing';

import { UsuariosCatalogoService } from './usuarios-catalogo.service';

describe('UsuariosCatalogoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuariosCatalogoService = TestBed.get(UsuariosCatalogoService);
    expect(service).toBeTruthy();
  });
});
