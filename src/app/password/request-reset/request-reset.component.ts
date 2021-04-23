import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../Services/services.service';
import {  SnotifyService } from 'ng-snotify';
import { FormBuilder, FormGroup , Validators,FormControl} from "@angular/forms";

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.scss']
})

export class RequestResetComponent implements OnInit {
  form: FormGroup;
  error=null;
constructor(private Services: ServicesService,public fb: FormBuilder, public n: SnotifyService) 
{ 
        this.form = this.fb.group({
          email: new FormControl(null,[ Validators.required,Validators.email]),}); 
}

ngOnInit() {}

onSubmit()
{ 
      this.n.info('veuillez attendre...',{timeout:5000});
      var formData: any = new FormData();
      formData.append("email", this.form.get('email').value);
      this.Services.sendPasswordResetLink(formData).subscribe(
                 data=>this.handleResponse(data),
                 error=>this.handleError(error)); 
}

handleResponse(data)
{
     var message = data.data ;
     this.n.success(message,{timeout:5000});
     this.form = this.fb.group({
      email:['']}); 
}
 
handleError(error)
{ 
      this.error = error.error.error; 
      this.n.error(this.error,{timeout:5000});
}

 get email() {return this.form.get('email');}
  
    
}
  