import { Desecho } from './desecho';
import { TipoEnvase } from './tipo-envase';

export class DesechoLiquido extends Desecho {
    volumen: number;
    tipoEnvase: TipoEnvase;
}