import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ServicesService } from '../Services/services.service';
import { TokenService } from '../Services/token-service.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public data:any;
  form: FormGroup;
  public error= []
gouvernorats2 = [{
 name: 'Marsa',
},
{
 name: 'Ben Arous',
}
];
role = [
  { name: 'Artisan'},
  { name: 'Client'}
];

  constructor(private  Services: ServicesService, private Token:TokenService,public fb: FormBuilder) { 
        this.form = this.fb.group({
          nom: [''],
          prenom: [''],
         datenaiss: [''],
         adresse: [''],
         gouvernorats:  [this.gouvernorats2[1]],
          role:  [this.role[1]],
         codePostal:  [''],
          email: [''],
          password: [''],
          password_confirmation: [''],
          image: [null]
         
        }); 
         
        this.Services.Image().subscribe(data => {
      this.data = data;
      console.log(this.data);
      }, error => console.error(error));
  }

        
      
    
      filedata:any;
      fileEvent(e){
          this.filedata = e.target.files[0];
          this.form.patchValue({
            image: this.filedata
          });
          console.log(this.form.get('image').value);
          this.form.get('image').updateValueAndValidity();
      }
    onSubmit(){
     var formData: any = new FormData();
     formData.append("nom", this.form.get('nom').value);
     formData.append("prenom", this.form.get('prenom').value);
     formData.append("datenaiss", this.form.get('datenaiss').value);
     formData.append("adresse", this.form.get('adresse').value);
     formData.append("gouvernorats",  this.form.get('gouvernorats').value );
     formData.append("role",  this.form.get('role').value );
     formData.append("codePostal", this.form.get('codePostal').value);
     formData.append("email", this.form.get('email').value);
     formData.append("password", this.form.get('password').value);
     formData.append("password_confirmation", this.form.get('password_confirmation').value);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    formData.append("image", this.form.get('image').value);
          this.Services.signup(formData,{ headers: headers}).subscribe(data => {
            data=>this.handleResponse(data)
            error=>this.handleError(error)
                });

    }
    handleResponse(data)
    {//store  the token 
      this.Token.handle(data.access_token);
    }
    handleError(error)
    {
       this.error = error.error.errors;
       
    }
   
    ngOnInit() {}
  
  }
