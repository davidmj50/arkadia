import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "src/app/services/cart.service";
import { IItem } from "src/app/models/Item.model";
import { IProduct } from "src/app/models/Product.model";
import { finalize } from 'rxjs/operators';
import { ProductsService } from "src/app/services/Impl/products.service";
import { CategoriesService } from "src/app/services/Impl/categories.service";
import { ICategory } from "src/app/models/Category.model";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  
  public loading: boolean = false;
  public products: IProduct[] = [];
  public categories: ICategory[] = [];
  
  constructor(private router: Router, 
    private _cartService: CartService,
    private productService: ProductsService,
    private categoriesService: CategoriesService,
    private messageService: MessageService) {}

  public listProducts: Array<IItem> = [
    {
      id: 0,
      img: "https://i.blogs.es/d5526e/arduino-uno/450_1000.jpg",
      name: "Arduino",
      price: 500,
      description:
        "Éste nuevo modelo Arduino UNO (rev3) es practicamente igual que su predecesor Duemilanove y 100% compatible pero incorpora ésta vez una autoselección del voltaje de alimentacion (DC/USB) gracias a un chip MOSFET incluido en la placa.",
      quantity: 1
    },
    {
      id: 1,
      img:
        "https://electronilab.co/wp-content/uploads/2016/02/NodeMCU-%E2%80%93-Board-de-desarrollo-con-m%C3%B3dulo-ESP8266-WiFi-y-Lua-1.jpg",
      name: "ESP8266 NodeMCU",
      price: 350,
      description:
        "El ESP8266 es un chip Wi-Fi de bajo coste que funciona mediante el protocolo TCP/IP. Incluye un microcontrolador (Tensilica Xtensa LX106) para manejar dicho protocolo y el software necesario para la conexión 802.11. Además la mayoría de modelos dispone de entradas/salidas digitales de propósito general (GPIO), así como una entrada analógica (ADC de 10bit).",
      quantity: 1
    },
    {
      id: 2,
      img:
        "https://createc3d.com/shop/1244-thickbox_default/comprar-modulo-rele-5v-compatible-con-arduino-1-canal-precio-oferta.jpg",
        name: "Modulo Relay Rele De 1 Canal 5v 10a Arduino Pic Avr Robotica",
        price: 120,
        description:
        "Módulo de relevadores (reles) para conmutación de cargas de potencia. Los contactos de los relevadores están diseñados para conmutar cargas de hasta 10 A y 250VAC (30VDC), aunque recomendamos dejar un márgen hacia abajo de estos límites. La señal de control puede provenir de cualquier circuito de control TTL o CMOS como un microcontrolador.",
        quantity: 1
      }
    ];

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }
  
  public loadCategories() {
    this.categoriesService.getCategories().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((resp : ICategory[]) => {
      this.loading = true;
      console.log(resp);
      this.categories = resp;
    }, error => {
      this.messageService.add({severity:'error', key: 'toastAdmin',summary:'Atención', detail:'Ha ocurrido un error al cargar las categorias!'});
    });
  }

  public loadProducts() {
    this.productService.getProducts().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((resp : IProduct[]) => {
      this.loading = true;
      console.log(resp);
      this.products = resp;
    }, error => {
      this.messageService.add({severity:'error', key: 'toastAdmin',summary:'Atención', detail:'Ha ocurrido un error al cargar los productos!'});
    });
  }

  viewProduct(idProducto: string) {
    this.router.navigate(["productDetail"], {
      queryParams: { idProduct: idProducto },
      skipLocationChange: false
    });
    window.scrollTo(0, 0);
  }

  public addCart(product: IProduct) {
    product.cantidad = 1;
    this._cartService.changeCart(product);
  }

  public filterCategory(idCategory: number) {
    console.log(idCategory);
    this.router.navigate(['/products'], {queryParams: {idCategory: idCategory}} );
    window.scrollTo(0, 0);
  }
}
