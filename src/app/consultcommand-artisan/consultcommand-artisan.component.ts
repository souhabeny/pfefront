import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { ServicesService } from '../Services/services.service';
import { TokenService } from '../Services/token.service';

@Component({
  selector: 'app-consultcommand-artisan',
  templateUrl: './consultcommand-artisan.component.html',
  styleUrls: ['./consultcommand-artisan.component.scss']
})

export class ConsultcommandArtisanComponent implements OnInit {
 
  search:any;
  produits:any[];
  data:any;
 constructor(private  Services: ServicesService, private Auth:AuthService,private Token:TokenService)
 { 
    var header = {
      headers: new HttpHeaders().set('Authorization',`Bearer ${this.Token.get()}`)
                 }
    this.Services.getAuthUser(header).subscribe(data => 
      {
         this.data = data;
      }, error => console.error(error));
 }

ngOnInit()
{
    this.getconsultproduitArtisan();
    setTimeout(() => {
      document.getElementById("load").style.visibility="hidden" ;
   }, 7000);
}
  
getconsultproduitArtisan():void
{
    var header = {
      headers: new HttpHeaders().set('Authorization',`Bearer ${this.Token.get()}`)
                 }
    this.Services.getAuthUser(header).subscribe(data =>
       {
              this.data = data;
              this.Services.getProduitCommandArtisan(this.data.id).subscribe
                ( produits => {this.produits=produits;});
       }, error => console.error(error));
}

}
