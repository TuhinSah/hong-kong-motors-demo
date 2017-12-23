import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Vehicle } from '../vehicle';
import { SearchParams } from '../search-params';

import { AuthService } from '../auth.service';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  vehicles: Vehicle[] = [];

  constructor(
    private vehicleService: VehicleService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getVehicles();
  }


  getVehicles(): void {
    this.vehicleService.getVehicles(<SearchParams>({
      minprice: null,
      maxprice: null,
      minyear: null,
      maxyear: null,
      make: null,
      mileage: null,
    }))
      .subscribe(vehicles => this.vehicles = vehicles.slice(1, 5));
  }


  searchVehicles(form: NgForm): void {
    this.vehicleService.searchVehicles(form.value);
    this.router.navigate(['/vehicles']);
  }
}
