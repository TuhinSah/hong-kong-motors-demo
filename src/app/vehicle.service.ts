import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Vehicle } from './vehicle';
import { VehicleDetail } from './vehicle-detail';
import { SearchParams } from './search-params'
import { MessageService } from './message.service';

@Injectable()
export class VehicleService {

  private vehiclesUrl = 'api/vehicles';
  private singleVehicleUrl = 'api/detail';

  public searchParamsSubject = new BehaviorSubject<any>({minprice: "min", maxprice: "max", minyear: "min", maxyear: "max", make: "all", mileage: "any"});

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  searchVehicles(paramValues) {
    this.searchParamsSubject.next(paramValues);

    this.searchParamsSubject.subscribe(
      searchParams => {}
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a VehicleService message with the MessageService */
  private log(message: string) {
    this.messageService.add('VehicleService: ' + message);
  }

  getVehicles(searchParams: SearchParams): Observable<Vehicle[]> {
    // Todo: send the message _after_ fetching the vehicles

    let Params = new HttpParams();

    if(searchParams.minprice !== null)
      Params = Params.append('minprice', searchParams.minprice.toString());
    if(searchParams.maxprice !== null)
      Params = Params.append('maxprice', searchParams.maxprice.toString());
    if(searchParams.minyear !== null)
      Params = Params.append('minyear', searchParams.minyear.toString());
    if(searchParams.maxyear !== null)
      Params = Params.append('maxyear', searchParams.maxyear.toString());
    if(searchParams.make !== null)
      Params = Params.append('make', searchParams.make);
    if(searchParams.mileage !== null)
      Params = Params.append('mileage', searchParams.mileage.toString());

    return this.http.get<Vehicle[]>(`${this.vehiclesUrl}`, { params: Params }).pipe(
        tap(vehicles => this.log(`fetched vehicles`)),
        catchError(this.handleError<Vehicle[]>('getVehicles', []))
      );
  }

  /** GET vehicle by id. Will 404 if id not found */
  getVehicle(id: number): Observable<VehicleDetail> {
    const url = `${this.singleVehicleUrl}/${id}`;
    return this.http.get<VehicleDetail>(url).pipe(
      tap(vehicle => this.log(`fetched vehicle id=${id}`)),
      catchError(this.handleError<VehicleDetail>(`getVehicle id=${id}`))
    );
  }
}