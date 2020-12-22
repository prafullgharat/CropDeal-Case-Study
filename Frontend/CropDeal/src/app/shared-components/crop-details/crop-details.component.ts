import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // to navigate from code.
import { ActivatedRoute } from '@angular/router'; //import this to read parameter.
import { ParamMap } from '@angular/router'; //this provides get method.
import { AuthService } from '../../services/auth/auth.service';
import { CropService } from '../../services/crop/crop.service';
import { DealerService } from '../../services/dealer/dealer.service';
import { OrderService } from '../../services/order/order.service';
import { WindowRefService } from '../../services/window-ref/window-ref.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-crop-details',
  templateUrl: './crop-details.component.html',
  styleUrls: ['./crop-details.component.css']
})
export class CropDetailsComponent implements OnInit {

  cropId: any;
  crop: any;
  isUpdated:Boolean =false;
 
  
  quantity: number = 0;
  price: number = 0;
  email: String;
  userType: String;
  dealer: any;
  isDealer: boolean = false;
  order:any;

  quantityHasError = true;
  validateQuantity(){
    if(this.quantity <= 0 ){
      this.quantityHasError = true;
    }
    else{
      this.quantityHasError = false;
    }
  }

  priceHasError = true;
  validatePrice(){
    if(this.price <= 0 ){
      this.priceHasError = true;
    }
    else{
      this.priceHasError = false;
    }
  }

  showRatingModalBox : boolean = false;
  // displayPayment = "none";

  constructor(private location: Location, private _auth: AuthService,private _orderService: OrderService, private _cropService: CropService, private route: ActivatedRoute, private router: Router, public winRef: WindowRefService) { }

  ngOnInit(): void {
    this.cropId = this.route.snapshot.paramMap.get('cropId');
    this._cropService.getCropById(this.cropId)
      .subscribe(
        res => {
          this.crop = res,
            console.log(this.crop);
        },
        err => console.log(err)
      )

    this.email = localStorage.getItem('email');
    this.userType = localStorage.getItem('userType');
    if (this.userType == "dealer") {
      this.isDealer = true;
    }
    this._auth.getUserById(this.email, this.userType)
      .subscribe(
        res => {
          this.dealer = res,
            console.log(this.dealer)
        },
        err => console.log(err)
      )


  }



  back(): void {
    this.location.back()
  }
  

  displayPayment = "none";
  showPaymentModal(){
    this.displayPayment='block';
    
  }

  hidePaymentModal(){
    this.displayPayment='none';
  }

  display='none';
  showRatingModal(){
    this.router.navigate(['dashboard/rating']);

    // this.display='block';
  }

  hideRatingModal(){
    this.display='none';
  }

  public Razorpay: any;

  pay(total) {
    this.isUpdated = false;

    var options = {
      "key": "rzp_test_GDor6jmgScyMhs", // Enter the Key ID generated from the Dashboard
      "amount": total * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": this.crop.FarmerName,
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      // "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

      "handler": response => {
        // alert("crop:"+this.crop);
          this.order = {
            paymentId: response.razorpay_payment_id,
            farmerEmail: this.crop.farmerEmail,
            dealerEmail:this.dealer.email,
            farmerName:this.crop.farmerName,
            dealerName:this.dealer.name,
            category:this.crop.category,
            cropName:this.crop.name,
            quantity:this.quantity,
            pricePerKg:this.price,
            totalAmount:total
          }
          this._orderService.postOrder(this.order)
              .subscribe(
                res => {
                    console.log(res);
                    // this.isUpdated = true;
                    // console.log(this.isUpdated);
                    alert("Payment Successful");
                    // t3his.router.navigate(['dashboard/rating']);
                },
                err => console.log(err)
          )
          // alert("payment id :" + response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature)
          // alert("Payment Successful");
          // this.router.navigate(['dashboard/rating']);
          // this.showRatingModal();

      },
      "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9028106852"
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };

    // var rzp1 = new Razorpay(options);
    this.Razorpay = new this.winRef.nativeWindow.Razorpay(options);
    this.Razorpay.on('payment.failed', function (response) {

      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
      alert("Payment Failed");
    });
    // document.getElementById('rzp-button1').onclick = function(e){
    this.Razorpay.open();
    // e.preventDefault();
    // }


  }

}
