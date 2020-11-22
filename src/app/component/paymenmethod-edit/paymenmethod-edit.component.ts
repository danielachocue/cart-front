import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enable } from 'src/app/domain/enable';
import { PaymentMethod } from 'src/app/domain/payment-method';
import { EnableService } from 'src/app/service/enable.service';
import { PaymenmethodService } from 'src/app/service/paymenmethod.service';

@Component({
  selector: 'app-paymenmethod-edit',
  templateUrl: './paymenmethod-edit.component.html',
  styleUrls: ['./paymenmethod-edit.component.css']
})
export class PaymenmethodEditComponent implements OnInit {

  public payId: number;
  public paymenMethod: PaymentMethod;

  public enables: Enable[];

  public showMsg: boolean = false;
  public mensajes: string[] = [""];

  constructor(public router:Router,
              public activeRouter: ActivatedRoute, public paymenMethodService: PaymenmethodService,
              public enableService: EnableService) { }

  ngOnInit(): void {
    let params=this.activeRouter.params['_value'];
    this.payId=params.payId;

    this.findById();
    this.findAllEnable();
  }

  public findById():void{
    this.paymenMethodService.findById(this.payId).subscribe(data=>{
      this.paymenMethod=data;
      console.table(this.paymenMethod);
    })
  }

  public findAllEnable(): void {
    this.enables = this.enableService.findAll();
  }

  public update(): void {
    this.mensajes = [""];
    this.paymenMethodService.update(this.paymenMethod).subscribe(ok => {
      this.showMsg = true;
      this.mensajes[0] = "El paymenMethod se modifico con exito" + this.payId;
    }, err => {
      console.log(err)
      this.showMsg = true;
      this.mensajes = err.error.error;

    });
  }

  public delete(): void {
    this.mensajes = [""];
    this.paymenMethodService.delete(this.paymenMethod.payId).subscribe(ok => {
      this.showMsg = true;
      this.mensajes[0] = "El paymenMethod se borro con exito" + this.payId;
    }, err => {
      console.log(err)
      this.showMsg = true;
      this.mensajes = err.error.error;

    });
  }

}