import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {name:"",phone:"",address:"",userType:"default"} 
  userTypeHasError = true;

  constructor(private _auth: AuthService,private _router: Router) { }

  ngOnInit(): void {

  }
  

  validateUserType(value:any){
    if(value === 'default'){
      this.userTypeHasError = true;
    }
    else{
      this.userTypeHasError = false;
    }
  }

  registerUser() {
    console.log(this.registerUserData);
    this._auth.registerUser(this.registerUserData)
    .subscribe( 
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('email',res.userEmail);
        localStorage.setItem('userType',res.userType);
        console.log(res.userType);
        if(res.userType == "dealer"){
          this._router.navigate(['/dashboard/profile']);
        }
        else if(res.userType == "farmer"){
          this._router.navigate(['/dashboard/profile'])
        }
        else{
          this._router.navigate(['/register']);
        }
        // console.log(res)
      },
      err =>{
        // console.log(err);
        // console.log(err.error);

      } 
    )      
  }



}
