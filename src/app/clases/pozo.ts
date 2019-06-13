import { Desecho } from './desecho';
import { Radionuclido } from './radionuclido';

export class Pozo {
    id: number;
    consecutivo: number;
    desechos: Desecho[];
    radionuclido: Radionuclido;
}