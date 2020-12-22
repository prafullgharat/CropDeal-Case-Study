import { Component, OnInit } from '@angular/core';
import { CropService } from '../../services/crop/crop.service'; 
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  crops = [];


  constructor(private _cropService: CropService, private _auth: AuthService, private router:Router) { }

  ngOnInit() {
    this._cropService.getCrops()
      .subscribe(
        res =>{
           this.crops = res
           if(this.crops.length > 9){
             this.crops = this.crops.slice(0, 9);
           }
        },
        err => console.log(err)
      )
  }

  

}
