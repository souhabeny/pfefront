import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ServicesService } from '../Services/services.service';
import { TokenService } from '../Services/token-service.service';
@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.scss']
})
export class SignupAdminComponent implements OnInit {

   data:any;
   form: FormGroup;
   public error= []
  constructor(private  Services: ServicesService, private http: HttpClient,public fb: FormBuilder,private Token:TokenService) { 
        this.form = this.fb.group({
          email: [''],
          password: [''],
          password_confirmation: [''],
        
         
        });
  }

    onSubmit(){
     var formData: any = new FormData();
     formData.append("email", this.form.get('email').value);
     formData.append("password", this.form.get('password').value);
     formData.append("password_confirmation", this.form.get('password_confirmation').value);
     this.Services.signupAdmin(formData).subscribe(data => {
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