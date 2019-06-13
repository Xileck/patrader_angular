import { Pipe, PipeTransform } from '@angular/core';
import { Persona } from '../clases/persona';

@Pipe({
  name: 'nombreCompleto'
})
export class NombreCompletoPipe implements PipeTransform {

  transform(persona: Persona, args?: any): any {

    let nombreCompleto = "";

    if (persona == null)
      return null;


    if (persona.nombre != null && persona.nombre.trim().length > 0)
      nombreCompleto += persona.nombre.trim();

    if (persona.apellidoPaterno != null && persona.apellidoPaterno.trim().length > 0)
      nombreCompleto += " " + persona.apellidoPaterno.trim();


    if (persona.apellidoMaterno != null && persona.apellidoMaterno.trim().length > 0)
      nombreCompleto += " " + persona.apellidoMaterno.trim();

    return nombreCompleto;
  }

}
