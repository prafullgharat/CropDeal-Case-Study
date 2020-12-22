import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './shared-components/register/register.component';
import { LoginComponent } from './shared-components/login/login.component';
import { CropComponent } from './shared-components/crop/crop.component';

import { AuthService } from './services/auth/auth.service';
import { CropService } from './services/crop/crop.service';
import { TokenInterceptorService } from './services/token-interceptor/token-interceptor.service';

import { AuthGuard } from './services/auth-guard/auth.guard';
import { SignupComponent } from './shared-components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CropDetailsComponent } from './shared-components/crop-details/crop-details.component';
import { ProfileComponent } from './shared-components/profile/profile.component';

import { ReceiptsComponent } from './shared-components/receipts/receipts.component';
import { DashboardComponent } from './shared-components/dashboard/dashboard.component';

import { FarmerModule } from './farmer/farmer.module';
import { DealerModule } from './dealer/dealer.module';
import { SearchCropPipe } from './pipes/search-crop.pipe';
import { AdminModule } from './admin/admin.module';
import { FarmerService } from './services/farmer/farmer.service';
import { HomepageComponent } from './shared-components/homepage/homepage.component';
import { WindowRefService } from './services/window-ref/window-ref.service';
import { OrderService } from './services/order/order.service';
import { InvoiceComponent } from './shared-components/invoice/invoice.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CropComponent,
    SignupComponent,
    CropDetailsComponent,
    ProfileComponent,
    SearchCropPipe,
    HomepageComponent,
    InvoiceComponent,
    ReceiptsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FarmerModule,
    DealerModule,
    AdminModule,
    NgbModule,
  ], 
  
  providers: [AuthService, CropService, FarmerService, OrderService, AuthGuard, WindowRefService
  ,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
