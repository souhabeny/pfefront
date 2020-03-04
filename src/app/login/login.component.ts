import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../Services/services.service';
import { TokenService } from '../Services/token-service.service';
import { AuthService } from '../Services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import {Router} from '@angular/router';
import { HttpClient , HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 public form ={email: null , password: null};
 public error =null;
 public donne =  null
 constructor(private router:Router ,private  Services: ServicesService, private  Token: TokenService ,private Auth:AuthService) { }

   onSubmit()
   {
     
     return this.Services.login(this.form).subscribe(
      data=>this.handleResponse(data),
      error=>this.handleError(error)
     );
      
   }
   handleError(error)
   {
      this.error = error.error; 
   }
  
  
   handleResponse(data)
   {//store  the token 
     this.Token.handle(data.access_token);
     this.Auth.changedAuthStatus(true);
     // console.log(data.role);
      //console.log(data.access_token);
      
     if(data.role =="admin")
   {console.log(data.user.email);
     this.router.navigate(['/Admin'])
     return true;
    
   }
   if(data.role =="Artisan")
   {console.log(data.user.email);
     this.router.navigate(['/Artisan'])
     return true;
   }
   if(data.role == "Client")
   {console.log(data.user.email);
     this.router.navigate(['/Client'])
     return true;
   }
   
   }
  

  ngOnInit() {
  }

}
