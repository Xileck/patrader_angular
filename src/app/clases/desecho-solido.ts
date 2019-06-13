import { Desecho } from './desecho';
import { TipoEnvase } from './tipo-envase';

export class DesechoSolido extends Desecho {
    peso: number;
    tipoEnvase: TipoEnvase;
}
