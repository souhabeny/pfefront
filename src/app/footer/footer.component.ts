import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
import {HttpHeaders} from '@angular/common/http';
import { ServicesService } from '../Services/services.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

loggedIn: boolean;
data:any;
token1 :any ;
constructor(private auth:AuthService, private router:Router, private token:TokenService , private Services:ServicesService)
   {
    
   }
ngOnInit() 
{
  this.auth.authStatus.subscribe(value => this.loggedIn = value) ;
}
login(event:MouseEvent)
{
    this.token1 = this.token.get();
    if(this.loggedIn == true)
   { 
     var header = {
      headers: new HttpHeaders().set('Authorization',`Bearer ${this.token1}`)
       }
      this.Services.getAuthUser(header).subscribe(data => 
        {
          this.data = data;
          if(this.data.role == "Client")
          {
            this.router.navigateByUrl('/Client');    
          }
          if(this.data.role == "Artisan")
          {
            this.router.navigateByUrl('/Artisan');
          }
        }, error => console.error(error));
    }
    if(this.loggedIn == false)
    {
        this.router.navigateByUrl('/login');
    }
}
signup(event:MouseEvent)
{
    this.token1 = this.token.get();
    if(this.loggedIn == true)
   {
      var header = {
      headers: new HttpHeaders().set('Authorization',`Bearer ${this.token1}`)
       }
      this.Services.getAuthUser(header).subscribe(data =>
         {
            this.data = data;
            if(this.data.role == "Client")
            {
              this.router.navigateByUrl('/Client');    
            }
            if(this.data.role == "Artisan")
            {
              this.router.navigateByUrl('/Artisan');
            }
         }, error => console.error(error));
   }
   if(this.loggedIn == false)
   {
    this.router.navigateByUrl('/signup');
   }
}

}
