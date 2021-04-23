import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { ServicesService } from '../../Services/services.service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { FormBuilder, FormGroup , Validators,FormControl} from "@angular/forms";

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.scss']
})

export class ResponseResetComponent implements OnInit {

  form: FormGroup;
  error =null;

constructor(private route : ActivatedRoute,private Services: ServicesService,private router:Router,public fb: FormBuilder,public n: SnotifyService) 
{ 
   this.form = this.fb.group({
      email: new FormControl(null,[ Validators.required,Validators.email]),
      password: new FormControl(null, [Validators.minLength(8),Validators.required]),
      password_confirmation: new FormControl(null, [Validators.minLength(8),Validators.required]),
      resetToken:null
    }); 

    var formData: any = new FormData();
    route.queryParams.subscribe(params => 
      {
        this.form.patchValue({
        resetToken: params['token']});
         this.form.get('resetToken').updateValueAndValidity();
      });
}

ngOnInit() {}

get email() {return this.form.get('email')}
get password(){return this.form.get('password')}
get password_confirmation(){return this.form.get('password_confirmation')}
   
onSubmit()
{   
     var formData: any = new FormData();
     formData.append("email", this.form.get('email').value);
     formData.append("password", this.form.get('password').value);
     formData.append("password_confirmation", this.form.get('password_confirmation').value);
     this.Services.changePassword(formData).subscribe(
      data=>this.handleResponse(data),
      error=>this.handleError(error));
}
   
handleResponse(data)
{      
       let _router = this.router;
       this.n.confirm('Vous pouvez maintenant connecté avec votre nouveau mot de passe',{
         buttons:[
          { text: 'Okay',
            action: toster =>{
             _router.navigateByUrl('/login'),
             this.n.remove(toster.id)
            }
           },
         ]
       })
}
    
handleError(error)
{   
       this.error = 'email ou mot de passe invalide';
       this.n.error(this.error,{timeout:0});
}

  }