import { Desecho } from './desecho';
import { Marca } from './marca';

export class FuenteSellada extends Desecho {
    peso: number;
    fechaFabricacion: Date;
    marcaContenedor: Marca;
    marcaFuente: Marca;
    numeroSerieCont: number;
    numeroSerieFuente: number;
}