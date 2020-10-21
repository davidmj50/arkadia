export interface ICategory {
    id?: number;
    nombre_Categoria: string;
    descripcion: string;
}

export class Category {
    id_Categoria?: number;
    nombre_Categoria: string;
    descripcion: string;

    constructor(nombre: string, descripcion: string, id_categoria: number) {
        this.nombre_Categoria = nombre;
        this.descripcion = descripcion;
        this.id_Categoria = id_categoria;
    }
}
export interface ICategory2 {
    id_Categoria: number;
    nombre_Categoria: string;
    descripcion: string;
}
