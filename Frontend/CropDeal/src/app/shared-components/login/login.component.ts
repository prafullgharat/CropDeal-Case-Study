import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  loginUserData = {password:"",email:""};
  errors = {passwordError:"", emailError:""}

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  loginUser () {
    
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('email',res.userEmail);
        localStorage.setItem('userType',res.userType);
        if(res.userType == "dealer" || res.userType == "farmer" || res.userType == "admin"){
          this._router.navigate(['/dashboard/crops']);
        }
        else{
          this._router.navigate(['/register']);
        }
      },
      err => {
        this.errors.passwordError = err.error.errors.password;
        this.errors.emailError = err.error.errors.email;
      } 
    ) 
  }

}
