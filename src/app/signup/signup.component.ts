import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup , Validators,FormControl} from "@angular/forms";
import { ServicesService } from '../Services/services.service';
import { TokenService } from '../Services/token.service';
import { AuthService } from '../Services/auth.service';
import {Router} from '@angular/router';
import {Gouvernerat} from '../model/gouvernerat';
import {ProduitService} from '../Services/produit.service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
 
  form: FormGroup;
  error =null;
  gouvernorats2 :Gouvernerat[];
  prod = [];
  data:any;
  fileimage :  any ;
  filedata:any;
  nbproduitpanier:number=0;
  SelectedRole:string="";
 
constructor(private router:Router ,private  Services: ServicesService,private Token:TokenService,public notif: SnotifyService,private Auth:AuthService,public fb: FormBuilder,private produitService:ProduitService) 
{ 
        this.form = this.fb.group({
          nom: new FormControl(null, [ Validators.required]),
          prenom: new FormControl(null,[ Validators.required]),
          email: new FormControl(null,[ Validators.required,Validators.email]),
          datenaiss: new FormControl(null,[ Validators.required]),
          adresse:new FormControl(null,[ Validators.required]),
          idGouvernerat: new FormControl(this.gouvernorats2,[ Validators.required]),
          role:  [''],
          domaine: [''],
          codePostal: new FormControl(null, [Validators.minLength(4),Validators.maxLength(4), Validators.required]),
          tel: new FormControl(null, [Validators.minLength(8),Validators.maxLength(8), Validators.required]),         
          password: new FormControl(null, [Validators.minLength(8),Validators.maxLength(20),Validators.required]),
          password_confirmation: new FormControl(null, [Validators.minLength(8),Validators.maxLength(20),Validators.required]),
          image: new FormControl(null,[ Validators.required])}); 
}

fileEvent(e)
{
 this.filedata = e.target.files[0];
 this.form.patchValue({
     image: this.filedata});
 this.form.get('image').updateValueAndValidity();
 this.fileimage =  this.filedata.name ;
}
Effacer()
{   
  this.fileimage = '';
  this.form = this.fb.group({
          nom: new FormControl(null, [ Validators.required]),
          prenom: new FormControl(null,[ Validators.required]),
          email: new FormControl(null,[ Validators.required,Validators.email]),
          datenaiss: new FormControl(null,[ Validators.required]),
          adresse:new FormControl(null,[ Validators.required]),
          role:  [''],
          domaine: [''],
          codePostal: new FormControl(null, [Validators.minLength(4),Validators.maxLength(4), Validators.required]),
          tel: new FormControl(null, [Validators.minLength(8),Validators.maxLength(8), Validators.required]),         
          password: new FormControl(null, [Validators.minLength(8),Validators.maxLength(20),Validators.required]),
          password_confirmation: new FormControl(null, [Validators.minLength(8),Validators.maxLength(20),Validators.required]),
          image: new FormControl(null,[ Validators.required])});

  this.form.patchValue({
     idGouvernerat: ''});
      
}
     
onSubmit()
{
   var formData: any = new FormData();
   formData.append("nom", this.form.get('nom').value);
   formData.append("prenom", this.form.get('prenom').value);
   formData.append("datenaiss", this.form.get('datenaiss').value);
   formData.append("adresse", this.form.get('adresse').value);
   formData.append("idGouvernerat",  this.form.get('idGouvernerat').value);
   formData.append("role",  this.form.get('role').value );
   formData.append("domaine", this.form.get('domaine').value);
   formData.append("codePostal", this.form.get('codePostal').value);
   formData.append("tel", this.form.get('tel').value);
   formData.append("email", this.form.get('email').value);
   formData.append("password", this.form.get('password').value);
   formData.append("password_confirmation", this.form.get('password_confirmation').value);
   const headers = new HttpHeaders();
   headers.append('Content-Type', 'multipart/form-data');
   headers.append('Accept', 'application/json');
    formData.append("image", this.form.get('image').value);
          this.Services.signup(formData,{ headers: headers}).subscribe(
            data=>this.handleResponse(data),
            error=>this.handleError(error));
}
    
handleResponse(data)

{ var datauser :any;
  this.Auth.changedAuthStatus(true);
  this.Token.handle(data.access_token);
  this.prod = JSON.parse(localStorage.getItem('prod'));
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
  this.Auth.changedUser(datauser);
  this.Auth.changedNotif(localStorage.getItem('notification'));
  if(data.role =="Artisan")
   {  
     if(this.nbproduitpanier>0)
       {
         this.router.navigate(['/panier/passcommand']);
       }
     else
       {
       this.router.navigate(['/Artisan']);
       }

     return true;
   }
 if(data.role == "Client")
  { 
    if(this.nbproduitpanier>0)
     {
     this.router.navigate(['/panier/passcommand']);
     }
    else
     {
      this.router.navigate(['/Client']);
     }

   return true;

  }
}

handleError(error)
{
 this.error = error.error.errors;
   if(error.error.errors.email != null)
      {
        this.error = 'Email existe déja';
        this.notif.error(this.error,{timeout:3000});
      }
   if(error.error.errors.password != null)
      {
        this.error = 'Mot de passe n\'est pas conforme';
        this.notif.error(this.error,{timeout:4000});
      }
}

getGouvernerat():void
{
   this.Services.getallGouvernerat().subscribe
    (gouvernerats => (this.gouvernorats2=gouvernerats));
}
   
ngOnInit()
{
  this.getGouvernerat();
  this.notif.info('Tous les champs sont obligatoires ',{timeout:5000});
  this.produitService.courantMessage.subscribe(msg => this.nbproduitpanier = msg);
}

radioChange(event: any)
{
  this.SelectedRole=event.target.value;
}

get nom() {return this.form.get('nom');}
get prenom() {return this.form.get('prenom');}
get email() {return this.form.get('email');}
get codePostal() {return this.form.get('codePostal');}
get tel() {return this.form.get('tel');}
get adresse() {return this.form.get('adresse');}
get domaine() {return this.form.get('domaine');}
get password() {return this.form.get('password');}
get  gouvernorats() {return  this.form.get('idGouvernerat');}
get date() {return this.form.get('datenaiss');}
get image() {return  this.form.get('image');}
get password_confirmation() { return this.form.get('password_confirmation');}
  
}
