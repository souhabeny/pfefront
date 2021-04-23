import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../Services/services.service';
import { TokenService } from '../Services/token.service';
import { FormBuilder, FormGroup , Validators,FormControl} from "@angular/forms";
import { AuthService } from '../Services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import {Router} from '@angular/router';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import {ProduitService} from '../Services/produit.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  error =null;
  donne =  null;
  nbproduitpanier:number=0;
  user : any;
  data:any;
  prod = [];
  devis = [];
  i :any ;
constructor(private router:Router ,private  Services: ServicesService, private  Token: TokenService , 
   private Auth:AuthService,private produitService:ProduitService, public fb: FormBuilder )
{ 
      this.form = this.fb.group({
       email: new FormControl(null,[ Validators.required,Validators.email]),      
       password: new FormControl(null, [Validators.minLength(8),Validators.required])}); 
}

onSubmit()
{   
     var formData: any = new FormData();
     formData.append("email", this.form.get('email').value);
     formData.append("password", this.form.get('password').value);
      return this.Services.login(formData).subscribe(
       data=>this.handleResponse(data),
       error=>this.handleError(error)
      );
}

handleError(error)
{
     this.error = error.error.error; 
}
   
handleResponse(data)
{    var datauser : any;
     this.Token.handle(data.access_token);
     this.Auth.changedAuthStatus(true);
     this.prod = JSON.parse(localStorage.getItem('prod'));
     this.devis = JSON.parse(localStorage.getItem('p'));
     if(this.prod != [])
     {
      localStorage.setItem("prod", JSON.stringify(this.prod));
     }
     else 
     { this.prod = [];
      localStorage.setItem("prod", JSON.stringify(this.prod));
     }
     datauser = {
        id : data.user.id,
        prenom : data.user.prenom,
        image : data.user.image 
      }
     localStorage.setItem("user", JSON.stringify(datauser));
     localStorage.setItem("tabc", JSON.stringify([])); 
     this.Auth.changedUser(datauser);
     this.Auth.changedNotif(localStorage.getItem('notification'));
     if(data.role =="admin")
     {
      this.error="Vous n'etes pas un utilisateur";
      this.Token.remove();
      this.Auth.changedAuthStatus(false);
     }
    if(data.role =="Artisan")
    {   
      if(this.prod != [])
      {
        this.router.navigate(['/panier/passcommand']);
      }
     else
      {
        this.router.navigate(['/Artisan']);
      }
      if(this.devis != null)
      {
        this.router.navigate(['/panier/devis']);
      
      }
     else
      {
        this.router.navigate(['/Artisan']);
      }
      return true;
    }

    if(data.role == "Client")
    { 
      if(this.prod != [])
      {
        this.router.navigate(['/panier/passcommand']);
      }
     else
      {
       this.router.navigate(['/Client']);
      }
       if(this.devis != null)
      {
     
        this.router.navigate(['/panier/devis']);
      
      
      }
     else
      {
        this.router.navigate(['/Client']);
      }
     
      return true;
    }
}
ngOnInit()
{
     this.Auth.authUser.subscribe(value => this.user = value) ;
     this.produitService.courantMessage.subscribe(msg => this.nbproduitpanier = msg);
}

get email() { return this.form.get('email');}
get password() { return this.form.get('password');}

}