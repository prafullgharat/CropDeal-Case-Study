import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css']
})
export class ReceiptsComponent implements OnInit {

  receipts:any =[];
  email:any;
  userType:any;
  isFarmer:boolean = false;
  isDealer:boolean = false;
  isAdmin:boolean = false;



  constructor(private _orderService: OrderService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.email = localStorage.getItem('email');
    this.userType = localStorage.getItem('userType');

    if(this.userType == "farmer"){
      this._orderService.getReceiptsByFarmerEmail(this.email)
        .subscribe(
          res =>{
            this.receipts = res
          },
          err => console.log(err)
        )
    }
    else if(this.userType == "dealer"){
      this._orderService.getReceiptsByDealerEmail(this.email)
        .subscribe(
          res =>{
            this.receipts = res
          },
          err => console.log(err)
        )
    }
    else if(this.userType == "admin"){
      this._orderService.getAllReceipts()
        .subscribe(
          res =>{
            this.receipts = res
          },
          err => console.log(err)
        )
    }


    if(this.userType == "dealer"){
      this.isDealer = true;
    }
    else if(this.userType == "farmer"){
      this.isFarmer = true;
    }
    else if(this.userType == "admin"){
      this.isAdmin = true;
    }
  }

  view(invoiceId){
    // this.router.navigate(['./edit-user', userEmail, userType],{ relativeTo: this.route });
    this.router.navigate(['dashboard/invoice',invoiceId]);
  }

}
