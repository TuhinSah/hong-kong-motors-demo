import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Vehicle } from '../vehicle';
import { SearchParams } from '../search-params'

import { AuthService } from '../auth.service';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  p: number = 1; 
  vehicles: Vehicle[];
  searchParams: SearchParams;

  constructor(
    private vehicleService: VehicleService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.vehicleService.searchParamsSubject.subscribe(
      searchParams => this.searchParams = searchParams);
    this.getVehiclesHelper();
  }

  getVehicles(form: NgForm): void {
    this.vehicleService.searchVehicles(form.value);
    this.getVehiclesHelper();
  }

  getVehiclesHelper(): void {
    this.vehicleService.getVehicles(this.searchParams)
        .subscribe(vehicles => this.vehicles = vehicles);
  }
}
