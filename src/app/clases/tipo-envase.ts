import { TipoDesecho } from './tipo-desecho';

export class TipoEnvase {
    id: number;
    identificacion: string;
    tipoDesecho: TipoDesecho;
    volumen: number;
    peso: number;
}
