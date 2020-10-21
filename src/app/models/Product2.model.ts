import { ICategory, Category } from './Category.model';

export interface IProduct {
    id_Producto?: number;
    nombre_Producto: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagen: string;
    categoria: ICategory;
}

export class Product {
    id_Producto?: number;
    nombre_Producto: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagen: string;
    categoria: Category;

    constructor(
        nombre_Producto: string,
        descripcion: string,
        precio: number,
        stock: number,
        imagen: string,
        id_categoria: number) {
        this.nombre_Producto    = nombre_Producto;
        this.descripcion        = descripcion;
        this.precio             = precio;
        this.stock              = stock;
        this.imagen             = imagen;
        this.categoria      = new Category('', '', id_categoria);
    }
}
