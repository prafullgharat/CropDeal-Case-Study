import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  profile:any;
  email: String;
  userType: String;
  isUpdated:Boolean = false;
  newImage:File = null;

  photoError ='';
  
  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    this.userType = localStorage.getItem('userType');
    this._auth.getUserById(this.email, this.userType)
      .subscribe(
        res => {
          this.user = res,
          this.profile = res
          // console.log(this.user);
        },
        err => console.log(err)
      )
  }

  displayModal = "none";
  showUpdateModal(){
    this.displayModal='block';
    
  }

  hideUpdateModal(){
    this.displayModal='none';
  }


  update() {      
    this.isUpdated = false;
    this._auth.updateProfile(this.email, this.userType,this.user)
          .subscribe(
            res => {
              this.user = res;
              // this.profile = res,
              // alert("Profile Updated"); 
              // this.showUpdateModal();
              this.isUpdated = true;
              // console.log(res);
            },
            err => {
              console.log(err);
              console.log(err.error);
            } 
          ) 
  }

  onFileSelected(event){
    this.photoError = '';
    this.newImage = <File>event.target.files[0];
    const formData = new FormData();
    formData.append('image',this.newImage,this.newImage.name);
    this._auth.updateProfilePhoto(this.email, this.userType, formData)
        .subscribe(
          res => {
              this.user = res;
              // alert("Profile Photo Updated");   
              this.showUpdateModal();
              // console.log(res);
          },
          err => {
              console.log(err);
              console.log(err.error);
              this.photoError = err.error.error;
          } 
        ) 
  }
  


}
