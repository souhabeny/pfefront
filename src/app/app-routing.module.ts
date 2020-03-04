import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ RouterModule , Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { SignupComponent } from './signup/signup.component';
import { SignupAdminComponent } from './signup-admin/signup-admin.component';
import {ResponseResetComponent} from './password/response-reset/response-reset.component';
import {RequestResetComponent} from './password/request-reset/request-reset.component';
import { DashboredArtisanComponent } from './dashbored-artisan/dashbored-artisan.component';
import { DashboredClientComponent } from './dashbored-client/dashbored-client.component';
const appRoutes: Routes = [
  {
    path:'login',
    component: LoginComponent,
   } ,
  {
    path: 'Client',
    component: DashboredClientComponent ,
  },
  {
    path: 'Artisan',
    component: DashboredArtisanComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'signupAdmin',
    component: SignupAdminComponent ,
  },
  {
    path: 'Admin',
    component: AdminComponent,
  },
  {
    path:'response-reset',
    component: ResponseResetComponent,
   } ,
   {
    path:'requestreset',
    component: RequestResetComponent,
   } 
];
@NgModule({
  declarations: [],
  imports: [
      RouterModule.forRoot(appRoutes),
    
  ],
   exports: [RouterModule]
})
export class AppRoutingModule { }
