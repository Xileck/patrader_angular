import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasCatalogoComponent } from './personas-catalogo.component';

describe('PersonasCatalogoComponent', () => {
  let component: PersonasCatalogoComponent;
  let fixture: ComponentFixture<PersonasCatalogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonasCatalogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
