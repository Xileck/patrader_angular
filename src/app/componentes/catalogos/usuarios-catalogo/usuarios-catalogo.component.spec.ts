import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosCatalogoComponent } from './usuarios-catalogo.component';

describe('UsuariosCatalogoComponent', () => {
  let component: UsuariosCatalogoComponent;
  let fixture: ComponentFixture<UsuariosCatalogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosCatalogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
