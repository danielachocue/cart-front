import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Customer } from 'src/app/domain/customer';
import { Email } from 'src/app/domain/email';
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import { User } from 'src/app/domain/user';
import { usuariomodel } from 'src/app/modelos/usariomodel';
import { AuthService } from 'src/app/service/auth.service';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { CustomerService } from 'src/app/service/customer.service';
import { AuthFirebaseService } from 'src/app/service/firbase-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  //traigo la clase User
  public user: User;
  public userToken: User;
  //inyecto el auth service
  constructor(private router: Router, private authService: AuthService, private customerService: CustomerService) { }
  ngOnInit(): void {
    //inicializo user con valores por defecto
    this.user = new User("", "");
    this.userToken = new User("", "");
  }

  public ingresar(): void {

    this.authService.loginFireBase(this.user)
    .then((data) => {

      console.log(data.user.uid);
      if (data.user.emailVerified == false) {
        alert("Email no verificado");
        this.authService.sendEmailVerification();
      } else {
        alert("Sección iniciada exictosamente");
        //creo una copia del user para que el token no aparezca en el front
        this.userToken.username = this.user.username;
        this.userToken.password = data.user.uid;
        //obtengo el token
        this.authService.loginUser(this.userToken).subscribe(token => {
          //guardo la informacion del usuario en el local storage
          localStorage.setItem("usuario", JSON.stringify(this.userToken));
          //coloco el token en el localstorage
          localStorage.setItem("token", token.token);

          //reviso el tipo de usuario
          this.customerService.findByIdWithHeaders(this.userToken.username).subscribe(userInfo => {
            localStorage.setItem("usuarioInfo", JSON.stringify(userInfo));
            if(userInfo.customerType==1){
              this.router.navigate(['/customer-list']);
            }else{
              this.router.navigate(['/product-list']);
            }

          },e=>{
            alert("usuario no encontrado en el back "+e.message);
          });


        }, err => {
          console.log("error");
          alert("Usuario o Contraseña incorrectos");
        });
      }

    }).catch(e => {
      alert("error iniciando seccion firebase"+e.message);
    });

}
}
