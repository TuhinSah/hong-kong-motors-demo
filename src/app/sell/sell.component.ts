import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  user: Object;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  	this.authService.getSellPage()
  	  .subscribe(sellPage => {
  	  	this.user = sellPage.user;
  	  }, err => {
  	  	console.log(err);
  	  	return false;
  	  });
  }

}
