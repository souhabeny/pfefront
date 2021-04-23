import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { ServicesService } from '../Services/services.service';
import { TokenService } from '../Services/token.service';

@Component({
  selector: 'app-consultcommandclient',
  templateUrl: './consultcommandclient.component.html',
  styleUrls: ['./consultcommandclient.component.scss']
})

export class ConsultcommandclientComponent implements OnInit {

  commandes:any[];
  lastproduits:any[];
  lignecommandes:any[];
  search:any;
  data:any;

constructor(private router:Router ,private  Services: ServicesService, private Auth:AuthService,private Token:TokenService) 
{  var header = {
      headers: new HttpHeaders().set('Authorization',`Bearer ${this.Token.get()}`)
                 }
   this.Services.getAuthUser(header).subscribe(data =>
     {
        this.data = data;
     }, error => console.error(error));
}

ngOnInit()
{
    this.getCommand();
    this.getlastproduitscommand();
    setTimeout(() => { document.getElementById("load").style.visibility="hidden" ; }, 7000);
}

getCommand():void
{
  var header = {
    headers: new HttpHeaders().set('Authorization',`Bearer ${this.Token.get()}`)
               }
  this.Services.getAuthUser(header).subscribe(data => 
    {
          this.data = data;
          this.Services.getcommandByUser(this.data.id).subscribe(commandes => {this.commandes=commandes;});
    }, error => console.error(error));
}
getlastproduitscommand():void
{
    var header = {
      headers: new HttpHeaders().set('Authorization',`Bearer ${this.Token.get()}`)
                 }
    this.Services.getAuthUser(header).subscribe(data =>
       {
   this.data = data;
   this.Services.getProduitCommandclientdernier(this.data.id).subscribe(produits => {this.lastproduits=produits;});
       }, error => console.error(error));
}

getproduitCommand(idcommand):void
{
   this.Services.getlignecommandByCommand(idcommand).subscribe( lignecommandes => {
     this.lignecommandes=lignecommandes;
     
    });
    
}

}
