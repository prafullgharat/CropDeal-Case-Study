import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  email:String;
  userType:String;
  isFarmer:boolean = false;
  isDealer:boolean = false;
  isAdmin:boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    this.userType = localStorage.getItem('userType');

    if(this.userType == "farmer"){
      this.isFarmer = true;
    }
    else if(this.userType == "dealer"){
      this.isDealer = true;
    }
    else if(this.userType == "admin"){
      this.isAdmin = true;
    }
  }

}
