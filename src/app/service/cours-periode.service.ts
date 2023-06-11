import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Cours} from "./cours";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Prof} from "./Prof";

@Injectable({
  providedIn: 'root'
})
export class CoursPeriodeService {

  constructor(private http: HttpClient) { }


  getCours(dateDeb: string, dateFin: string): Observable<Cours[]> {
    const queryParams = `?dateDeb=${dateDeb}&dateFin=${dateFin}`;
    return this.http.get<Cours[]>(`http://localhost:10000/cours/cours-list${queryParams}`);
  }



}
