import { ISale } from "./Sale.model";
import { IProduct } from "./Product.model";

export interface ISaleDetail {
    id_Detalle: number;
    cantidad: number;
    descuento: number;
	valor_Descuento: number;
    monto: number;
    id_venta: number;
    id_producto: number;
}


export class SaleDetail {
    id_Detalle: number;
    cantidad: number;
    descuento: number;
	valor_Descuento: number;
    monto: number;
    venta: ISale;
    producto: IProduct;

    constructor(cantidad: number, descuento: number, valor_Descuento: number, monto: number,venta: ISale, producto: IProduct){
        this.cantidad = cantidad;
        this.descuento = descuento;
        this.valor_Descuento = valor_Descuento;
        this.monto = monto;
        this.venta = venta;
        this.producto = producto;
    }
}