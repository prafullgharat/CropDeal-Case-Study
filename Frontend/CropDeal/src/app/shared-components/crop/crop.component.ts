import { Component, OnInit } from '@angular/core';
import { CropService } from '../../services/crop/crop.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.css']
})
export class CropComponent implements OnInit {

  crops = [];
  subscribed:any = false;
  fruits:any = false;
  vegetables:any = false;
  searchText:String ='';
  userType:String;
  isDealer:Boolean=false;
  constructor(private _cropService: CropService, private router:Router) { }

  ngOnInit() {
    this.userType = localStorage.getItem('userType');
    if(this.userType == "dealer"){
      this.isDealer = true;
    }
    this._cropService.getCrops()
      .subscribe(
        res =>{
           this.crops = res,
           this.searchText =''
        },
        err => console.log(err)
      )
  }

  filter(category){

    let categoryArray =[];
    console.log(this.subscribed+" "+this.vegetables+ " "+ this.fruits);
    console.log(category.type);

    //to check which checkbox in clicked
    if(category.type == "subscribed"){
      this.subscribed = !this.subscribed;
    }
    else if(category.type == "vegetables"){
      this.vegetables = !this.vegetables;
    }
    else if(category.type == "fruits"){
      this.fruits = !this.fruits;
    }

    //set category Array 
    if(this.vegetables){
      categoryArray.push("vegetable");
    }
    if(this.fruits){
      categoryArray.push("fruit")
    }
    if(categoryArray.length == 0){
      categoryArray = ['vegetable', 'fruit'];
    }


    console.log(this.subscribed+" "+this.vegetables+ " "+ this.fruits);

    console.log(categoryArray);

    //to fetch subscribed filtered crops
    if(this.subscribed){
      this._cropService.getSubscribedCrops(categoryArray)
      .subscribe(
        res => this.crops = res,
        err => console.log(err)
      )
    }

    //to fetch filtered crops
    else{
      this._cropService.getFilteredCrops(categoryArray)
        .subscribe(
          res => this.crops = res,
          err => console.log(err)
        )
    }
  }

  
}
