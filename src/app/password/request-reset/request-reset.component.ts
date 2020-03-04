import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../Services/services.service';
import {  SnotifyService } from 'ng-snotify';
@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.scss']
})
export class RequestResetComponent implements OnInit {
  form = {email:null};
    constructor(private Services: ServicesService, private notify: SnotifyService) { }
  
    ngOnInit() 
    {
    }
   
    onSubmit()
     {
       this.notify.info('Wait...',{timeout:5000})
       this.Services.sendPasswordResetLink(this.form).subscribe(
                 data=>this.handleResponse(data),
                 error=>this.notify.error(error.error.error)
        );
        
    }
    handleResponse(res)
    { this.notify.success(res.data,{timeout:0})
      this.form.email =  null;
    }
    
  }
  