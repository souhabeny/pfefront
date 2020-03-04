
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { SignupAdminComponent } from './signup-admin/signup-admin.component';
import { ResponseResetComponent } from './password/response-reset/response-reset.component';
import { RequestResetComponent } from './password/request-reset/request-reset.component';
import { TokenService } from './Services/token-service.service';
import { AuthService } from './Services/auth.service';
import { AfterLoginService } from './Services/after-login.service';
import { BeforeLoginService } from './Services/before-login.service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { ServicesService } from './Services/services.service';
import { DashboredAdminComponent } from './dashbored-admin/dashbored-admin.component';
import { DashboredArtisanComponent } from './dashbored-artisan/dashbored-artisan.component';
import { DashboredClientComponent } from './dashbored-client/dashbored-client.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    AdminComponent,
    SignupComponent,
    SignupAdminComponent,
    ResponseResetComponent,
    RequestResetComponent,
    DashboredAdminComponent,
    DashboredArtisanComponent,
    DashboredClientComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SnotifyModule,
  
  ],
  providers: [ServicesService,TokenService,AuthService,AfterLoginService,BeforeLoginService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
