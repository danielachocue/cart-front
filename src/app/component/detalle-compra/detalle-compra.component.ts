import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentMethod } from 'src/app/domain/payment-method';
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import { CloseShoppingCart } from 'src/app/domain/shoppingCartClose';
import { ShoppingProduct } from 'src/app/domain/shoppingProduct';
import { detalleCompraModel } from 'src/app/modelos/detalleCompraModelo';
import { PaymenmethodService } from 'src/app/service/paymenmethod.service';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import { ShoppingProductService } from 'src/app/service/shopping-product.service';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.component.html',
  styleUrls: ['./detalle-compra.component.css']
})
export class DetalleCompraComponent implements OnInit {

  public carts:ShoppingCart[];
  public products:ShoppingProduct[];
  public products2:ShoppingProduct[]=null;
  public purchase:detalleCompraModel=new detalleCompraModel();
  public payments:PaymentMethod[];
  public cartClose:CloseShoppingCart= new CloseShoppingCart(null,null);

  constructor(public shoppingProductService:ShoppingProductService,public shoppingCartService:ShoppingCartService,private routActive:ActivatedRoute
              ,public paymentMethodService:PaymenmethodService,public route:Router) { }
  carId:number;
  email:string=null;
  pageActual:number=1;

  ngOnInit(): void {
    this.getCarId();
    this.getProducts();
    this.findAllPayment();
  }

  getCarId(): void {
    this.routActive.params.subscribe(resp => {
      let email = resp['email'];
      this.email=email;

      if (email) {
        this.shoppingCartService.findCarIdShoppingCartsByEmail(email).subscribe(resp => {
          this.carts = resp;
          this.carts.forEach(resp => {
            if(resp.paymentMethodId==null){
              this.carId=resp.carId;

            }
          });
          this.getProducts();
        })

      }
    })
  }

  getProducts(): void {
    this.shoppingProductService.findAll().subscribe(resp => {
      this.products = resp;
      this.products2=[];
      this.products.forEach(resp => {
        if(resp.shoppingCartId===this.carId){
          this.products2.push(resp);
        } 
      });
    })
  }

  delete(proId: number): void {
    this.shoppingCartService.removeProduct(this.carId, proId).subscribe(data => {
      alert("Producto eliminado");
      this.getProducts();
    }, error => {
      console.log(error);
    })


  }

  findAllPayment():void{
    this.paymentMethodService.finAll().subscribe(data=>{
      this.payments=data;
    },error=>{
      console.error(error);
    })
  }

  closePurchase():void{
    this.cartClose.carId=this.carId;
    this.cartClose.payId=this.purchase.cardType;
    this.shoppingCartService.closeShoppingCart(this.cartClose).subscribe((resp)=>{
        this.route.navigate(['/tienda']);
    }
    )

  } 

}
