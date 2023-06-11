import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Prof} from "./Prof";
import {Type} from "./Type";

@Injectable({
  providedIn: 'root'
})

export class TypeService {

  // Node/Express API
  REST_API: string = 'http://localhost:10000/type';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  // Add
  Add(data: Type): Observable<any> {
    let API_URL = `${this.REST_API}/add-type`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  GetAll(): Observable<Type[]> { // Définit le type de retour de la méthode
    return this.httpClient.get<Type[]>(this.REST_API);
  }

  // Get single object
  GetOne(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/read-type/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  // Update
  update(id:any, data:any): Observable<any> {
    let API_URL = `${this.REST_API}/update-type/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete
  delete(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-type/${id}`;
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
