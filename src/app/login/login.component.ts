import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private flashMessageService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogInSubmit(form: NgForm) {
    const user = {
      username: form.value.username,
      password: form.value.password
    }

    // Register User
    this.authService.authenticateUser(user)
      .subscribe(data => {
        if(data.success) {
          this.authService.storeUserData(data.token, data.user);
//          this.flashMessageService.show("You are now logged in", {cssClass: 'alert-success', timeout: 5000});
          this.router.navigate(['/']);
        } else {
          this.flashMessageService.show(data.message, {cssClass: 'alert-danger', timeout: 5000});
          this.router.navigate(['/login']);
        }
      });
  }

}
