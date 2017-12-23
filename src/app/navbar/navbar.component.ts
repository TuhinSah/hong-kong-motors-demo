import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    private flashMessageService: FlashMessagesService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogOutClick() {
    this.authService.logOut();
    this.flashMessageService.show("You are logged out.", {cssClass: 'alert-success', timeout: 5000});
    this.router.navigate(['/login']);
    return false;
  }

}
