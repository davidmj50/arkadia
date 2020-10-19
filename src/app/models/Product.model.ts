import { ICategory } from "./Category.model";

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