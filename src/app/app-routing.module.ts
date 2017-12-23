import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VehiclesComponent }    from './vehicles/vehicles.component';
import { VehicleDetailComponent }  from './vehicle-detail/vehicle-detail.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { LoginComponent }   from './login/login.component';
import { RegisterComponent }   from './register/register.component';
import { SellComponent }   from './sell/sell.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: VehicleDetailComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'sell', component: SellComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
