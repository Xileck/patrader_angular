import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasCatalogoComponent } from './empresas-catalogo.component';

describe('EmpresasCatalogoComponent', () => {
  let component: EmpresasCatalogoComponent;
  let fixture: ComponentFixture<EmpresasCatalogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresasCatalogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
