import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SellComponent } from './sell/sell.component';

import { VehicleService } from './vehicle.service';
import { MessageService } from './message.service';
import { ValidateService } from './validate.service';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [
    AppComponent,
    VehiclesComponent,
    VehicleDetailComponent,
    MessagesComponent,
    DashboardComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    SellComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [ VehicleService, MessageService, ValidateService, AuthService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
