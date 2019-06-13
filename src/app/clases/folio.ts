import { Desecho } from './desecho';
import { Empresa } from './empresa';
import { Persona } from './persona';
import { Almacen } from './almacen';
import { TipoDesecho } from './tipo-desecho';
import { TipoEmisor } from './tipo-emisor';

export class Folio {
    id: number;
    identificacion: string;
    desechos: Desecho[];
    anio: number;
    empresa: Empresa;
    numeroLicencia: string;
    persEsr: Persona;
    reutilizarAutorizado: boolean;
    recepcion: Almacen;
    fechaRecepcion: Date;
    persEntrego: Persona;
    persRecibio: Persona;
    persReviso: Persona;
    fechaReviso: Date;
    tipoDesecho: TipoDesecho;
    emisor: TipoEmisor;
    listaObservaciones: string[];
}
