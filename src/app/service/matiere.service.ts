import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Matiere} from "./Matiere";

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  // Node/Express API
  REST_API: string = 'http://localhost:10000/matiere';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  // Add
  Add(data: Matiere): Observable<any> {
    let API_URL = `${this.REST_API}/add-matiere`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  GetAll(): Observable<Matiere[]> { // Définit le type de retour de la méthode
    return this.httpClient.get<Matiere[]>(this.REST_API);
  }

  // Get single object
  GetById(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/read-matiere/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  // Update
  update(id:any, data:any): Observable<any> {
    let API_URL = `${this.REST_API}/update-matiere/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete
  delete(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-matiere/${id}`;
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
