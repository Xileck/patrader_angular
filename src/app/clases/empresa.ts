import { Persona } from './persona';

export class Empresa {
    id: number;
    nombre: string;
    telefono: string;
    codigoPostal:string;
    estado: string;
    ciudad: string;
    calle: string;
    numCalle: string;
    representante: Persona;
    fechaCreacion: Date;


    constructor() {
       
    }
}