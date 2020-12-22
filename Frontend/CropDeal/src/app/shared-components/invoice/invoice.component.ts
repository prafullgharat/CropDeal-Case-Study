import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router'; // to navigate from code.
import{ActivatedRoute} from '@angular/router'; //import this to read parameter.
import{ParamMap} from '@angular/router'; //this provides get method.
import { OrderService } from '../../services/order/order.service';

import * as html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoiceId:any;
  order:any;

  constructor(private _orderService: OrderService,private route :ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.paramMap.get('invoice-id');

    this._orderService.getInvoiceById(this.invoiceId)
      .subscribe(
        res => {
          this.order = res,
          console.log(this.order);
        },
        err => console.log(err)
      )
  }

  print(){
    const options ={
      filename: this.order.paymentId,
      image:{type:'jpeg'},
      html2canvas:{},
      jsPDF:{orientation:'landscape'}
    };

    const content:Element = document.getElementById('invoice');

    html2pdf()
    .from(content)
    .set(options)
    .save();
  }


}
