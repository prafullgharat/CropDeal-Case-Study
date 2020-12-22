import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DealerService } from 'src/app/services/dealer/dealer.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  subscribedCrops:any =[];

  cropsList:any = [];

  vegetables:Array<string>  = ["Carrot", "Broccoli", "Cauliflower","Corn","Cucumber","Eggplant",
  "Mushrooms","Onion","Potato",
  "Pumpkin","Red pepper","Tomato","Beetroot",
  "Brussel sprouts", "Peas", "Green bean"];

  fruits:Array<string>  = ["Grapes", "Cherry", "Blueberry","Banana",
  "Apple","Watermelon",
  "Peach","Pineapple","Strawberry",
  "Orange","Coconut","Pear","Avocado",
  "Kiwi", "Mango", "Papaya"];

  cropName:String;
  category:String;
  success:Boolean= false;
  alreadySubscribed:Boolean = false;
  constructor(private _dealerService: DealerService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this._dealerService.getSubscription()
      .subscribe(
        res =>{
           this.subscribedCrops = res
        },
        err => console.log(err)
      )
  }
  onSelect(){
    console.log(this.category);
    if(this.category === "fruit"){
      this.cropsList = this.fruits;
    }
    else if(this.category === "vegetable") {
      this.cropsList = this.vegetables;
    }


    console.log(this.category);
    this.success= false;
    this.alreadySubscribed = false;

  }
  add(){
    this.success = false;
    this.alreadySubscribed = false;

    console.log(this.cropName);
    this._dealerService.subscribeNewCrop(this.cropName)
      .subscribe(
        res =>{
          console.log(res);
           this.subscribedCrops = res;
           this.success =  true
        },
        err =>{
          console.log(err),
          
          this.alreadySubscribed =  true

        }
      )
  }

  unsubscribe(cropName){

    console.log(cropName);
    this._dealerService.unSubscribeCrop(cropName)
      .subscribe(
        res =>{
          console.log(res);
           this.subscribedCrops = res;
          //  this.success =  true
        },
        err =>{
          console.log(err)
          
          // this.alreadySubscribed =  true

        }
      )
  }


}
