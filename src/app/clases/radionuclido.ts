import { TipoEmisor } from './tipo-emisor';

export class Radionuclido {
    id: number;
    identificacion: string;
    vidaMedia: number;
    emisor: TipoEmisor;
}