import { Injectable } from "@angular/core";
import { IItem } from "../models/Item.model";
import { BehaviorSubject } from "rxjs";
import { IProduct } from "../models/Product.model";

@Injectable({
  providedIn: "root"
})
export class CartService {

  private cart = new BehaviorSubject<Array<IProduct>>(null); //Definimos nuestro BehaviorSubject, este debe tener un valor inicial siempre
  public currentDataCart$ = this.cart.asObservable(); //Tenemos un observable con el valor actual del BehaviourSubject

  constructor() {}

  public changeCart(newData: IProduct) {
    //Obtenemos el valor actual
    let listCart = this.cart.getValue();
    //Si no es el primer item del carrito
    if (listCart) {
      //Buscamos si ya cargamos ese item en el carrito
      let objIndex = listCart.findIndex(obj => obj.id_Producto == newData.id_Producto);
      //Si ya cargamos uno aumentamos su cantidad
      if (objIndex != -1) {
        listCart[objIndex].cantidad += 1;
      }
      //Si es el primer item de ese tipo lo agregamos derecho al carrito
      else {
        listCart.push(newData);
      }
    }
    //Si es el primer elemento lo inicializamos
    else {
      listCart = [];
      listCart.push(newData);
    }
    this.cart.next(listCart); //Enviamos el valor a todos los Observers que estan escuchando nuestro Observable
    console.log(listCart);
  }

  public removeElementCart(newData: IProduct) {
    //Obtenemos el valor actual de carrito
    let listCart = this.cart.getValue();
    //Buscamos el item del carrito para eliminar
    let objIndex = listCart.findIndex(obj => obj.id_Producto == newData.id_Producto);
    if (objIndex != -1) {
      //Seteamos la cantidad en 1 (ya que los array se modifican los valores por referencia, si vovlemos a agregarlo la cantidad no se reiniciará)
      listCart[objIndex].cantidad = 1;
      //Eliminamos el item del array del carrito
      listCart.splice(objIndex, 1);
    }
    this.cart.next(listCart); //Enviamos el valor a todos los Observers que estan escuchando nuestro Observable
  }

  public getProductsCart() : IProduct[] {
    return this.cart.getValue();
  }
}
