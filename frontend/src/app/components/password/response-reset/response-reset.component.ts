import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JarwisService } from '../../../Service/jarwis.service';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {
  public form = {
    email                 : null,
    password              : null,
    password_confirmation : null,
    resetToken            : null
  };
  public error = [];
  constructor(
    private route:ActivatedRoute,
    private jarwisService: JarwisService,
    private router :Router,
    private Notify: SnotifyService) { 
    route.queryParams.subscribe(params => {
        this.form.resetToken = params['token'];
    });
  }

  ngOnInit() {
  }

  onSubmit( ){
      this.jarwisService.changePassword(this.form).subscribe(
          data  => this.handleResponse(data),
          error => this.handleError(error)
      );
  }

  handleResponse(data){
     let _router = this.router;
     this.Notify.confirm('Done! Now login with new password',{
       buttons: [
          {
            text: 'Okay',
            action: toster =>{
              _router.navigateByUrl('/login'),
              this.Notify.remove(toster.id)
            }
          }
       ]
     })
     
      
  }

  handleError(error){
    this.error = error.error.errors;
  }

}
