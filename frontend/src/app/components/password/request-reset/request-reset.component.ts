import { Component, OnInit } from '@angular/core';
import { JarwisService } from './../../../Service/jarwis.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  constructor(
    private jarwisService: JarwisService,
    private notify: SnotifyService) { }
  public form = {
      email : null
  };
  ngOnInit() {
  }

  onSubmit(){
      this.jarwisService.sendPasswordResetLink(this.form).subscribe(
        data => this.handleResponse(data),
        error => this.notify.error(error.error.error)
      );
  }

  handleResponse(res) {
    console.log("res :", res);
    this.form.email = null;
  }

}
