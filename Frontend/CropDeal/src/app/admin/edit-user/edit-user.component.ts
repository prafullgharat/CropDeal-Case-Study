import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router'; // to navigate from code.
import{ActivatedRoute} from '@angular/router'; //import this to read parameter.
import{ParamMap} from '@angular/router'; //this provides get method.
import { AuthService } from 'src/app/services/auth/auth.service';
import { FarmerService } from 'src/app/services/farmer/farmer.service';



@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user:any;
  userType:String;
  userEmail:String;
  isUpdated:Boolean = false;

  newImage:File = null;


  constructor(private _auth: AuthService, private _service:FarmerService ,private route :ActivatedRoute, private router:Router) { }


  ngOnInit(): void {
    this.userType = this.route.snapshot.paramMap.get('userType');
    this.userEmail = this.route.snapshot.paramMap.get('userEmail');

    this._auth.getUserById(this.userEmail, this.userType)
      .subscribe(
        res => {
          this.user = res,
          console.log(this.user);
        },
        err => console.log(err)
      )
  }

  update() {      
    this.isUpdated = false;
    this._auth.updateProfile(this.userEmail, this.userType,this.user)
          .subscribe(
            res => {
              this.user = res;
              // alert("User's Details Updated");   
              console.log(res);
              this.isUpdated = true;
            },
            err => {
              console.log(err);
              console.log(err.error);
            } 
          ) 
  }

  onFileSelected(event){
    this.newImage = <File>event.target.files[0];
    const formData = new FormData();
    formData.append('image',this.newImage,this.newImage.name);
    this._auth.updateProfilePhoto(this.userEmail, this.userType, formData)
        .subscribe(
          res => {
              this.user = res;
              alert("Profile Photo Updated");   
              console.log(res);
          },
          err => {
              console.log(err);
              console.log(err.error);
          } 
        ) 
  } 

}
