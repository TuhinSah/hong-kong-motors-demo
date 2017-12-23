import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
//  	console.log(user);
  	if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined || user.name == "" || user.email == "" || user.username == "" || user.password == "") {
  		return false;
  	} else {
  		return true;
  	}
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

  validatePassword(password, password2) {
    if(password === password2) {
      return true;
    } else {
      return false;
    }
  }
}
