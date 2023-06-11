import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Prof} from "./Prof";

@Injectable({
  providedIn: 'root'
})

export class ProfService {

  // Node/Express API
  REST_API: string = 'http://localhost:10000/prof';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  // Add
  AddProf(data: Prof): Observable<any> {
    let API_URL = `${this.REST_API}/add-prof`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  GetProfs(): Observable<Prof[]> { // Définit le type de retour de la méthode
    return this.httpClient.get<Prof[]>(this.REST_API);
  }

  // Get single object
  GetProf(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/read-prof/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  // Update
  updateProf(id:any, data:any): Observable<any> {
    let API_URL = `${this.REST_API}/update-prof/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete
  deleteProf(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-prof/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
      catchError(this.handleError)
    )
  }


  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
