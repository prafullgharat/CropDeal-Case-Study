import { Component, OnInit } from '@angular/core';
import { CropService } from '../../services/crop/crop.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-publish-crop',
  templateUrl: './publish-crop.component.html',
  styleUrls: ['./publish-crop.component.css']
})
export class PublishCropComponent implements OnInit {


  cropData = { name: "default", category: "default", quantity: "", address: "", description: "" }

  cropsList: any = [];

  vegetables: Array<string> = ["Carrot", "Broccoli", "Cauliflower", "Corn", "Cucumber", "Eggplant",
    "Mushrooms", "Onion", "Potato",
    "Pumpkin", "Red pepper", "Tomato", "Beetroot",
    "Brussel sprouts", "Peas", "Green bean"];

  fruits: Array<string> = ["Grapes", "Cherry", "Blueberry", "Banana",
    "Apple", "Watermelon",
    "Peach", "Pineapple", "Strawberry",
    "Orange", "Coconut", "Pear", "Avocado",
    "Kiwi", "Mango", "Papaya"];

  cropImage: File = null;
  categoryHasError = true;
  cropNameHasError = true;
  quantityHasError = true;

  error = '';



  validateCategory(value:any){
    if(value === 'default'){
      this.categoryHasError = true;
    }
    else{
      this.categoryHasError = false;
    }
  }

  validateCropName(value:any){
    if(value === 'default'){
      this.cropNameHasError = true;
    }
    else{
      this.cropNameHasError = false;
    }
  }

  validateQuantity(value:any){
    if(value <= 0 ){
      this.quantityHasError = true;
    }
    else{
      this.quantityHasError = false;
    }
  }

  onFileSelected(event) {
    this.cropImage = <File>event.target.files[0];
  }

  constructor(private cropService: CropService, private _router: Router) { }

  ngOnInit(): void {
  }

  onSelect(){
    console.log(this.cropData.category);
    if(this.cropData.category === "fruit"){
      this.cropsList = this.fruits;
    }
    else if(this.cropData.category === "vegetable") {
      this.cropsList = this.vegetables;
    }
    console.log(this.cropData.category);
  }

  isPublished:Boolean = false;
  publishCrop() {
    this.isPublished = false;
    const formData = new FormData();
    formData.append('image', this.cropImage, this.cropImage.name);
    formData.append('name', this.cropData.name);
    formData.append('category', this.cropData.category);
    formData.append('quantity', this.cropData.quantity);
    formData.append('address', this.cropData.address);
    formData.append('description', this.cropData.description);


    console.log(this.cropData);
    console.log(formData);

    this.cropService.publishCrop(formData)
      .subscribe(
        res => {
          // this._router.navigate(['/farmer'])       
          // console.log(res);
          // alert("Crop is published");
          this.isPublished = true;
        },
        err => {
          // console.log(err);
          // console.log(err.error);
          this.error = err.error.error;

        }
      )
  }

}
