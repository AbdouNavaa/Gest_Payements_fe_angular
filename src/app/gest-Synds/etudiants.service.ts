import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IEtud} from "./IEtud";

@Injectable({
  providedIn: 'root'
})
export class EtudService {

  constructor(private http: HttpClient) { }

  getNoms() {
      return this.http.get<IEtud[]>("http://localhost:8080/election/public/etudient/all")
  }
}
