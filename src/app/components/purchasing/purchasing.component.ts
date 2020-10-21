import { Component, OnInit, AfterContentChecked } from "@angular/core";
import { IUser } from "src/app/models/User.model";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { CartService } from "src/app/services/cart.service";
import { IProduct } from "src/app/models/Product.model";
import { SalesService } from "src/app/services/Impl/sales.service";
import { finalize } from "rxjs/operators";
import { ISale } from "src/app/models/Sale.model";
import { SalesDetailsService } from "src/app/services/Impl/sales-details.service";
import { PointsUserService } from "src/app/services/Impl/points-user.service";

declare const $: any;

@Component({
  selector: "app-purchasing",
  templateUrl: "./purchasing.component.html",
  styleUrls: ["./purchasing.component.css"]
})
export class PurchasingComponent implements OnInit, AfterContentChecked {
  
  public totalAmount: number = 0;
  public userLogged: IUser;
  public products: IProduct[] = [];
  public datePurchase = new Date();
  public pointsUser: number;
  public loading: boolean;
  public comprobante: string;
  public purchaseSuccess = false;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private _cartService: CartService,
    private salesService: SalesService,
    private saleDetailingService: SalesDetailsService,
    private pointsUserService: PointsUserService
  ) {}

  ngAfterContentChecked(): void {
    this.validateLogging();
    // this.validarCarrito();
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.validateLogging();
    this.validarCarrito();
    this.comprobante = this.generateIdPurchase();
  }

  validarCarrito(): void {
    this.products = this._cartService.getProductsCart();
    if (!this.products || this.products.length == 0) {
      this.router.navigate(["/home"]);
    }
    this.totalAmount = 0;
    this.products.forEach(element => {
      this.totalAmount += element.cantidad * element.precio;
    });
  }

  validateLogging() {
    this.userLogged = JSON.parse(localStorage.getItem("userInfo"));
    this.pointsUser = parseInt(localStorage.getItem("pointsUser"));
    if (!this.userLogged) {
      this.router.navigate(["/home"]); 
    }
  }

  purchase() {
    this.salesService.savePurchase(this.userLogged, this.totalAmount, this.datePurchase, this.comprobante).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((result: ISale) => {
      this.loading = true;
      if(result.id_Venta > 0) {
        this.purchaseSuccess = true;
        $('.bd-purchase-success-modal-lg').modal({
          show: true,
        });
        this.saveDetails(result);
        this._cartService.removeAll();
      }
    }, error => {
      this.messageService.add({severity:'error', key: 'toastAdmin',summary:'Atención', detail:'Hubo un error al guardar la transaccion de compra'});
    });
    
  }

  generateIdPurchase() {
    return 'xxxx-xxxx-yxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(8);
    });
  }

  getPointsUser(idUser: number) {
    this.pointsUserService.getPoints(idUser.toString()).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((result) => {
      this.loading = true;
      this.pointsUser = result;
      localStorage.setItem("pointsUser", this.pointsUser.toString());
    }, error => {
      this.messageService.add({severity:'error', key: 'toastAdmin',summary:'Atención', detail:'Hubo un error al consultar los puntos del usuario.'});
    });
  }

  saveDetails(result: ISale){
    this.saleDetailingService.saveSaleDetails(result, this.products).pipe(
      finalize(() => {
        this.loading = false;
        this.getPointsUser(this.userLogged.id_Usuario);
      })
    ).subscribe((result2: any) => {
      // console.log(result2);
    });
  }
}
