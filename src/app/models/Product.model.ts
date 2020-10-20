import { ICategory} from "./Category.model";

export interface IProduct {
    id_Producto: number;
    nombre_Producto: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagen: string;
    category: ICategory;
    id_categoria: number;
    cantidad: number;
}

export class Product {
    id_Producto: number;
    nombre_Producto: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagen: string;
    category: ICategory;
    id_categoria: number;
    cantidad: number;

    constructor( model?: Product) {
        this.id_Producto        = model.id_Producto;
        this.nombre_Producto    = model.nombre_Producto;
        this.descripcion         = model.descripcion;
        this.precio              = model.precio;
        this.stock               = model.stock;
        this.imagen              = model.imagen;
        this.category            = model.category;
        this.id_categoria        = model.id_categoria;
        this.cantidad            = model.cantidad;
    }
}
