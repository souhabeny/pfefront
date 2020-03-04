import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { ServicesService } from '../../Services/services.service';
import {  SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.scss']
})
export class ResponseResetComponent implements OnInit {
  public  form ={ email : null, password : null ,  password_confirmation : null , resetToken : null}
  public  error= {email : null, password : null ,  password_confirmation : null }
  constructor(private route : ActivatedRoute,
    private Services: ServicesService,
    private router:Router,
    private Notify: SnotifyService) 
    {
    route.queryParams.subscribe(params => 
      {
      this.form.resetToken= params['token']
    console.log(this.form.resetToken);
      });
  
   }
   
    ngOnInit() 
    {
    }
   onSubmit()
   {
    this.Services.changePassword(this.form).subscribe(
      data=>this.handleResponse(data),
      error=>this.handleError(error)
    );
   }
   handleResponse(data)
    {  let _router = this.router;
       this.Notify.confirm('Done!, Tu peux login avec  le nouveau password',{
         buttons:[
           {
             text: 'Okay',
             action: toster=>{
              _router.navigateByUrl('/login');
              this.Notify.remove(toster.id)
             }
           },
         ]
       })
      
    }
    handleError(error)
    { 
      this.error = error.error.errors;
    }
  }
  
    
