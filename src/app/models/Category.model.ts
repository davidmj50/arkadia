export interface ICategory {
    id?: number;
    nombre_Categoria: string;
    descripcion: string;
}

export class Category {
    id?: number;
    nombre_Categoria: string;
    descripcion: string;

    constructor(nombre: string, descripcion: string) {
        this.nombre_Categoria = nombre;
        this.descripcion = descripcion;
    }
}
