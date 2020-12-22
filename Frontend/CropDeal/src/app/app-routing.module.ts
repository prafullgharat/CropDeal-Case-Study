import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './shared-components/login/login.component';
import { RegisterComponent } from './shared-components/register/register.component';
import { SignupComponent } from './shared-components/signup/signup.component';
import { CropComponent } from './shared-components/crop/crop.component';
import { AuthGuard } from './services/auth-guard/auth.guard';
import { PublishCropComponent } from './farmer/publish-crop/publish-crop.component';
import { PublishedCropsComponent } from './farmer/published-crops/published-crops.component';
import { CropDetailsComponent } from './shared-components/crop-details/crop-details.component';
import { ProfileComponent } from './shared-components/profile/profile.component';
import { DashboardComponent } from './shared-components/dashboard/dashboard.component';
import { FarmerManagementComponent } from './admin/farmer-management/farmer-management.component';
import { DealerManagementComponent } from './admin/dealer-management/dealer-management.component';
import { EditUserComponent } from './admin/edit-user/edit-user.component';
import { HomepageComponent } from './shared-components/homepage/homepage.component';
import { ReceiptsComponent } from './shared-components/receipts/receipts.component';
import { InvoiceComponent } from './shared-components/invoice/invoice.component';
import { SubscriptionComponent } from './dealer/subscription/subscription.component';
import { RatingComponent } from './dealer/rating/rating.component';



const routes: Routes = [
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  // {
  //   path: 'crop',
  //   component: CropComponent,
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'crop/:cropId',
  //   component: CropDetailsComponent,
  //   children: [{
  //     path: 'rating',
  //     component: RatingComponent, 
  //     canActivate: [AuthGuard],
  //   }],
  // },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'publish',
        component: PublishCropComponent, 
        canActivate: [AuthGuard],
      },
      {
        path: 'published-crops',
        component: PublishedCropsComponent, 
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard], 
      },
      {
        path: 'crops',
        component: CropComponent, 
        canActivate: [AuthGuard],
      },
      {
        path: 'crop/:cropId',
        component: CropDetailsComponent,
        // children: [{
        //   path: 'rating/:email',
        //   component: RatingComponent, 
        //   canActivate: [AuthGuard],
        // }],
        canActivate: [AuthGuard],
      },
      {
        path: 'rating',
        component: RatingComponent, 
        canActivate: [AuthGuard],
      },
      {
        path: 'farmer-management',
        component: FarmerManagementComponent, 
        canActivate: [AuthGuard],
      },
      {
        path: 'dealer-management',
        component: DealerManagementComponent, 
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-user/:userType/:userEmail',
        component: EditUserComponent, 
        canActivate: [AuthGuard],
      },
      {
        path: 'farmer/receipts',
        component: ReceiptsComponent, 
        canActivate: [AuthGuard],
      },
      {
        path: 'invoice/:invoice-id',
        component: InvoiceComponent, 
        canActivate: [AuthGuard],
      },
      {
        path: 'subscription',
        component: SubscriptionComponent, 
        canActivate: [AuthGuard],
      }
      

    ],
    canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
