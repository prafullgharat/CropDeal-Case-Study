import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DealerService } from 'src/app/services/dealer/dealer.service';

@Component({
  selector: 'app-dealer-management',
  templateUrl: './dealer-management.component.html',
  styleUrls: ['./dealer-management.component.css']
})
export class DealerManagementComponent implements OnInit {

  isConfirm:any;
  dealers:any =[];
  deleteDealerId:any;
  isDeleted:Boolean = false;

  constructor(private _dealerService: DealerService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this._dealerService.getAllDealers()
      .subscribe(
        res =>{
           this.dealers = res
        },
        err => console.log(err)
      )
  }

  edit(userEmail, userType){
    this.router.navigate(['dashboard/edit-user',userType, userEmail]);
  }

  delete(userEmail){
      this.isDeleted = false;
    // this.isConfirm = confirm("Are you sure you want to delete user " + userEmail +"?");
    
      this._dealerService.deleteDealer(userEmail)
        .subscribe(
          res =>{
            // alert(userEmail + " is deleted" );  
            this.isDeleted = true;

            this._dealerService.getAllDealers()
                .subscribe(
                    res =>{
                      this.dealers = res
                    },
                    err => console.log(err)
                )
          },
          err => console.log(err)
        )
    
  }

}
