import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';

import { MessageService } from './message.service';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  private registerUrl = "users/register";
  private authenticateUrl = "users/authenticate";
  private sellPageUrl = "users/sell";

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

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
    this.messageService.add('AuthService: ' + message);
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logOut() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getSellPage() {
    this.loadToken();
    let headers = new HttpHeaders({ 'Authorization': this.authToken });
    return this.http.get(`${this.sellPageUrl}`, { headers: headers }).pipe(
      tap(res => this.log("Success")),
      catchError(this.handleError<any>('getSellPage'))
    );
  }

  authenticateUser(user): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.authenticateUrl}`, user, { headers: headers }).pipe(
      tap(res => this.log(res)),
      catchError(this.handleError<any>('authenticateUser'))
    );
  }

  registerUser(user): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<any>(`${this.registerUrl}`, user, { headers: headers }).pipe(
      tap(res => this.log(res)),
      catchError(this.handleError<any>('registerUser'))
    );
  }

}
