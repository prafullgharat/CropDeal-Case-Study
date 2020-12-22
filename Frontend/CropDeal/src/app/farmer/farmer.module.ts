import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishCropComponent } from './publish-crop/publish-crop.component';
import { PublishedCropsComponent } from './published-crops/published-crops.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 

@NgModule({
  declarations: [PublishCropComponent, PublishedCropsComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    PublishCropComponent,
    PublishedCropsComponent
  ]
})
export class FarmerModule { }
