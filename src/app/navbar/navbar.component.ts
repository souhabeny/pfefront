import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
import {HttpHeaders} from '@angular/common/http';
import { ServicesService } from '../Services/services.service';
import {ProduitService} from '../Services/produit.service';
import Echo from 'laravel-echo';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  echo :Echo;
  loggedIn: boolean;
  p:any[];
  data:any;
  notification:number=0;
  nbproduitpanier:number=0;
  private user: any;
  private user1 :any;
  private token1: any;
  constructor(private auth:AuthService,
    private router:Router,
    private token:TokenService , private Services:ServicesService,private Auth:AuthService,private produitService:ProduitService)
     {
      this.auth.authUser.subscribe(value => this.user1 = value) ;
     }
   
  ngOnInit()
   {
      this.auth.authStatus.subscribe(value => this.loggedIn = value) ;
      this.setupEvent();
      this.produitService.courantMessage.subscribe(msg => this.nbproduitpanier = msg);
      
       if(this.nbproduitpanier == 0)
       {
         this.p = JSON.parse(localStorage.getItem('prod'));
          if(this.p != null)
          {
            this.nbproduitpanier = this.p.length;
          } 

       
       }
       this.notification=JSON.parse(localStorage.getItem('notification'));
    var header = {
      headers: new HttpHeaders().set('Authorization',`Bearer ${this.token.get()}`)
       }
    this.Services.getAuthUser(header).subscribe(data => {
      this.data = data;
      }, error => console.error(error));
     
  }
  logout(event:MouseEvent)
  {
    localStorage.removeItem("user");
    this.token1 = this.token.remove();
    this.router.navigateByUrl('/login');
    if(JSON.parse(localStorage.getItem('prod')) != null)
        {
          this.produitService.removeAllProduitpanier();
        } 
    this.produitService.removeTotal();
    this.produitService.removeDevis();
    localStorage.setItem("notification", JSON.stringify(0));
    this.notification=0;
    this.auth.changedAuthStatus(false);
    this.user = null;
    this.auth.changedUser(this.user);
    localStorage.removeItem("p");
   
  }
  login(event:MouseEvent)
  { 
    this.token1 = this.token.get();
    var header = {
      headers: new HttpHeaders().set('Authorization',`Bearer ${this.token1}`)
       }
    this.Services.getAuthUser(header).subscribe(data => {
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
  
  setupEvent()
  {
   this.echo=new Echo({
       broadcaster: 'socket.io',
       host:'http://localhost:6001',
     });
    window['echo']=this.echo;
    this.listene();
  } 
 
 listene()
  {  
     this.echo.channel('Event')
      .listen('.Event',(e)=>{
         var env=Object.values(e);
         var t:any[]=env.splice(0,1);
         var ind=e.message.length-1;
     
          if(e.message[ind].id!=this.data.id && (this.data.id==e.message[ind].idClient || this.data.id==e.message[ind].idArtisan))
          {
            this.notification++;
           localStorage.setItem("notification", JSON.stringify(this.notification));

          }
       });
          this.notification=JSON.parse(localStorage.getItem('notification'));
   }
 onClickMsg()
{ 
    this.notification =  this.notification - JSON.parse(localStorage.getItem('notification'));
    localStorage.setItem("notification", JSON.stringify(this.notification));
    this.Auth.changedNotif(localStorage.getItem('notification'));
 }
 
}
