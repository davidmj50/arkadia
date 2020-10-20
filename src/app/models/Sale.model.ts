import { IUser, User } from "./User.model";

export interface ISale {
    id_Venta: number;
    comprobante_Venta: string;
    fecha_Venta: Date;
    total_Venta: number;
    usuario: number;
}


export class Sale {
    id_Venta?: number;
    comprobante_Venta: string;
    fecha_Venta: Date;
    total_Venta: number;
    usuario: User;

    constructor(
        id_Venta: number, 
        comprobante_Venta: string, 
        fecha_Venta: Date, 
        total_Venta: number,        
        usuario: User) {
            this.id_Venta = id_Venta;
            this.comprobante_Venta = comprobante_Venta;
            this.fecha_Venta = fecha_Venta;
            this.total_Venta = total_Venta;
            this.usuario = usuario
    }
}