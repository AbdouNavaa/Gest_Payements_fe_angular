import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Matiere} from "./Matiere";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Cours} from "./cours";

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  // Node/Express API
  REST_API: string = 'http://localhost:10000/cours';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  // Add
  Add(data: Cours): Observable<any> {
    let API_URL = `${this.REST_API}/create`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  GetAll(): Observable<Cours[]> { // Définit le type de retour de la méthode
    return this.httpClient.get<Cours[]>(this.REST_API);
  }

  // Get single object
  GetById(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/read-cours/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  // Update
  update(id:any, data:Cours): Observable<any> {
    let API_URL = `${this.REST_API}/update/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete
  delete(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/delete/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
      catchError(this.handleError)
    )
  }

  getTotal(dateDeb: string, dateFin: string): Observable<any> {
    let API_URL = `${this.REST_API}/total?dateDeb=${dateDeb}&dateFin=${dateFin}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders });
  }

  getTotalById(id: String, dateDeb: string, dateFin: string): Observable<any> {
    let API_URL = `${this.REST_API}/total/${id}?dateDeb=${dateDeb}&dateFin=${dateFin}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders });
  }


  getCoursByProf(id: String) {
    return this.httpClient.get<Cours[]>(`${this.REST_API}/prof/${id}`).pipe(
      map(cours => cours.filter(c => c.prof._id === id))
    );
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

