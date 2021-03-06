import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Email } from 'src/app/domain/email';
import { Enable } from 'src/app/domain/enable';
import { shoppingCartModel } from 'src/app/modelos/shoppingCartModelo';
import { EnableService } from 'src/app/service/enable.service';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-save',
  templateUrl: './shopping-cart-save.component.html',
  styleUrls: ['./shopping-cart-save.component.css']
})
export class ShoppingCartSaveComponent implements OnInit {
  
  title: string = 'New Shopping Cart';
  shoppingCart = new shoppingCartModel();
  enables: Enable[]
  public creatCartEmail:Email= new Email(null);

  constructor(private route:Router,private shoppingCartService:ShoppingCartService,
              private enableService: EnableService, public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.findAllEnable();
  }
  public findAllEnable(): void {
    this.enables = this.enableService.findAll();
  }
 

  save(): void {
    this.shoppingCartService.save(this.shoppingCart).subscribe((rsp) => {
      alert("Shopping Cart guardado");
      this.route.navigate(['/shopping-cart-list']);
    });
  }

  createCart():void{
    this.shoppingCartService.createCart(this.creatCartEmail).subscribe(resp=>{
      this.route.navigate(['/shoppingCart'])
    })
  }

  logout() {
    this.auth.signOut();
    localStorage.clear()
    this.route.navigate(['/login'])
    
  }

}
