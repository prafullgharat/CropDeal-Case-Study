import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupUserData = {password:"",email:""}
  confirmPassword = "";
  emailError = "";

  constructor(private _auth: AuthService,private _router: Router) { }

  ngOnInit(): void {

  }
  signupUser() {
    console.log(this.signupUserData);
    this._auth.signupUser(this.signupUserData)
    .subscribe( 
      res => {
        localStorage.setItem('token', res.token);
        this._auth.setUserEmail(res.userEmail);
        // console.log(res.userType);
        
        if(res.userType == "dealer"){
          this._router.navigate(['/crop']);
        }
        else if(res.userType == "farmer"){
          this._router.navigate(['/crop'])
        }
        else{
          this._router.navigate(['/register']);
        }
        // console.log(res)
      },
      err =>{
        console.log(err);
        console.log(err.error);
        this.emailError = err.error.errors.email;

      } 
    )      
  }

}
