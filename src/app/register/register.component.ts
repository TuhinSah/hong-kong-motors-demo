import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { ValidateService } from '../validate.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private validateService: ValidateService,
    private flashMessageService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(form: NgForm) {
    const user = {
      name: form.value.name,
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
      password2: form.value.password2
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)) {
      this.flashMessageService.show("Please fill all the class fields", {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

    // Valid Email
    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessageService.show("Please use a valid email", {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

    // Confirm Password
    if(!this.validateService.validatePassword(user.password, user.password2)) {
      this.flashMessageService.show("Passwords do not match", {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

    // Register User
    this.authService.registerUser(user)
      .subscribe(data => {
        if(data.success) {
          this.flashMessageService.show("You are now registered and can log in", {cssClass: 'alert-success', timeout: 5000});
          this.router.navigate(['/login'])
        } else {
          this.flashMessageService.show("Something went wrong", {cssClass: 'alert-danger', timeout: 5000});
          this.router.navigate(['/register'])
        }
      });
  }
}
