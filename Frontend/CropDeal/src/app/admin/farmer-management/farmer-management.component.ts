import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../../services/farmer/farmer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-farmer-management',
  templateUrl: './farmer-management.component.html',
  styleUrls: ['./farmer-management.component.css']
})
export class FarmerManagementComponent implements OnInit {

  isConfirm:any;
  farmers:any =[];
  deleteFarmerId:any;
  isDeleted:Boolean = false;
  constructor(private _farmerService: FarmerService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this._farmerService.getAllFarmers()
      .subscribe(
        res =>{
           this.farmers = res
        },
        err => console.log(err)
      )
  }

  edit(userEmail, userType){
    // this.router.navigate(['./edit-user', userEmail, userType],{ relativeTo: this.route });
    this.router.navigate(['dashboard/edit-user',userType, userEmail]);
  }

  delete(userEmail){
    this.isDeleted = false;
    // this.isConfirm = confirm("Are you sure you want to delete user " + userEmail +"?");
    
      this._farmerService.deleteFarmer(userEmail)
        .subscribe(
          res =>{
            // alert(userEmail + " is deleted" );
            this.isDeleted = true;
            this._farmerService.getAllFarmers()
                .subscribe(
                    res =>{
                      this.farmers = res
                    },
                    err => console.log(err)
                )
          },
          err => console.log(err)
        )
    
  }

}
