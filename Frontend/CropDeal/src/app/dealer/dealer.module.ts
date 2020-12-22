import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SubscriptionComponent } from './subscription/subscription.component';
import { RatingComponent } from './rating/rating.component';

@NgModule({
  declarations: [SubscriptionComponent, RatingComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
  ]
})
export class DealerModule { }
