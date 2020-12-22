import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _signupUrl = "http://localhost:4000/api/auth/signup";
  private _loginUrl = "http://localhost:4000/api/auth/login";
  private _registerUrl = "http://localhost:4000/api/auth/register";
  private _commonUrl = "http://localhost:4000/api";

  userEmail:string;

  justUser:string;

  constructor(private http: HttpClient,private _router: Router) { }


  setUserEmail(userEmail:string){
    this.userEmail = userEmail;
    // console.log("inside auth service " +this.userEmail);
  }

  getUserEmail(){
    // console.log("inside getUserEMail : "+ this.userEmail);
    return this.userEmail;
  }

  registerUser(user) {
      return this.http.post<any>(this._registerUrl, user);
  }

  signupUser(user) {
    return this.http.post<any>(this._signupUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !!localStorage.getItem('token');    
  }

  getUserById(email, userType) {
    return this.http.get<any>(this._commonUrl +"/"+ userType + "/get/"+ email);
  }

  updateProfilePhoto(email, userType, formData) {
    return this.http.put<any>(this._commonUrl +"/"+ userType + "/update-photo/"+ email, formData);
  }

  updateProfile(email, userType, user) {
    return this.http.put<any>(this._commonUrl +"/"+ userType + "/update/"+ email, user);
  }

}
