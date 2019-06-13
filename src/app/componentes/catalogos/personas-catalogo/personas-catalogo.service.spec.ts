import { TestBed } from '@angular/core/testing';

import { PersonasCatalogoService } from './personas-catalogo.service';

describe('PersonasCatalogoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonasCatalogoService = TestBed.get(PersonasCatalogoService);
    expect(service).toBeTruthy();
  });
});
