import { MetodoMedicion } from './metodo-medicion';
import { Radionuclido } from './radionuclido';
import { TipoDesecho } from './tipo-desecho';

export class Desecho {
    id: number;
    identificacion: string;
    consecutivo: number;
    tipoDesecho: TipoDesecho;
    radionuclido: Radionuclido;
    actividadInicial: number;
    actividadFinal: number;
    actividadRotulada: number;
    densidad: number;
    dosisContacto: number;
    dosis1m: number;
    metodoMedicion: MetodoMedicion;
    numeroAutorizacionCNSNS: string;
    fechaCalibracion: Date;
    fechaEntrada: Date;
    fechaSalida: Date;
}