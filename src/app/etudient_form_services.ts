import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etudient } from 'src/models/etudient';

@Injectable()
export class EtudientService {
  private baseUrl: string;
  private addUrl: string;
  private getAllUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080/election/public/etudient';
    this.addUrl = '/add';
    this.getAllUrl = '/all';
  }

  public findAll(): Observable<Etudient[]> {
    return this.http.get<Etudient[]>(this.baseUrl + this.getAllUrl);
  }

  public save(etudient: Etudient) {
    return this.http.post<Etudient>(this.baseUrl + this.addUrl, etudient);
  }
}
