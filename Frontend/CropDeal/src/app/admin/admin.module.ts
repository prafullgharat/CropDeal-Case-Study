import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmerManagementComponent } from './farmer-management/farmer-management.component';
import { DealerManagementComponent } from './dealer-management/dealer-management.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EditUserComponent } from './edit-user/edit-user.component';


@NgModule({
  declarations: [FarmerManagementComponent, DealerManagementComponent, EditUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
    
  ],
  exports: [
    FarmerManagementComponent,
    DealerManagementComponent,
    EditUserComponent
  ]
})
export class AdminModule { }
