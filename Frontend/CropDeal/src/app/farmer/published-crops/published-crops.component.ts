import { Component, OnInit } from '@angular/core';
import { CropService } from '../../services/crop/crop.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-published-crops',
  templateUrl: './published-crops.component.html',
  styleUrls: ['./published-crops.component.css']
})
export class PublishedCropsComponent implements OnInit {

  crops = [];
  constructor(private _cropService: CropService, private _auth: AuthService) { }
  email:String;
  

  ngOnInit() {

    this.email = localStorage.getItem('email');


    this._cropService.getCropsByFarmerId(this.email)
      .subscribe(
        res => this.crops = res,
        err => console.log(err)
      )
  }

}


