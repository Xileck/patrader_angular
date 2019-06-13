import { Pipe, PipeTransform } from '@angular/core';
import { Empresa } from '../clases/empresa';

@Pipe({
  name: 'empresaDireccion'
})
export class EmpresaDireccionPipe implements PipeTransform {

  transform(empresa: Empresa, simple: boolean): any {

    //completo
    let calle = (empresa.calle != null ? empresa.calle.substr(0, 10) + ' ' : '')
    let numCalle = (empresa.calle != null ? empresa.calle + ', ' : '')
    //let colonia = (empresa.codigoPostal.asentamiento != null ? empresa.codigoPostal.asentamiento + ', ' : '')

    //simple y completo usan estos
    let ciudad = (empresa.ciudad != null ? empresa.ciudad + ', ' : '')
    let estado = empresa.estado
    let codigoPostal = ', C.P. ' + empresa.codigoPostal;


    if (simple) {
      return ciudad + estado + codigoPostal
    }
    else {

      return calle + numCalle +  ciudad + estado + codigoPostal;

    }

  }

}
