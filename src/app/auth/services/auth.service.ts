import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {empty, Observable, throwError} from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

import { tap } from 'rxjs/operators';
import { LoginResponse } from '../login/login_response_payload';
import {ILogin} from "../ILogin";
import {Itoken} from "../Itoken";
import {LocalDbService} from "../local-db.service";
import {UtilService} from "../util.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() nom: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    nom: this.getnom(),
  };

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService,
    private localDbService: LocalDbService,
    private utilService: UtilService,
    private router: Router,
  ) {}

  getSyndicats() {
    let token="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYWxlbUBnbWFpbC5jb20iLCJpYXQiOjE2Nzg4Njk3MDksImV4cCI6MTY3ODg3MTE0OX0.v5eug5D5CjsMLzCiz1p5V8-VAxU3M2zcJDeLorpsFL8"
    let head_obj=new HttpHeaders().set("Authorization","Bearer " +token)
    this.httpClient.get("http://localhost:8080/syndicat/admin/syndicat/all")
  }
  getEtudients(){
  return this.httpClient.get("http://localhost:8080/election/public/etudient/all");
  }

  // getEtudients(): Observable<any> {
  //   let role = this.localDbService.userRole;
  //   console.log('role:', role);
  //   if (role === 'ADMIN') {
  //     const token = this.localDbService.token;
  //     console.log('token:', token);
  //     const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  //     return this.httpClient.get("http://localhost:8080/election/admin/etudient/all", { headers });
  //   //
  //   } else {
  //     console.log('User is not admin');
  //     return empty(); // ou une erreur / exception appropriée si nécessaire
  //   }
  // }
  logout() {
    return this.httpClient.post('http://localhost:8080/api/auth/logout', {});
  }
  // getEtudients():  Observable<any> {
  //   const role = this.localDbService.userRole;
  //   if (role === 'ADMIN') {
  //     const token = this.localDbService.token;
  //     const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  //     return this.httpClient.get("http://localhost:8080/election/admin/etudient/all", { headers });
  //
  //   } else {
  //     return empty(); // ou une erreur / exception appropriée si nécessaire
  //   }
  // }


  logIn(loginObj: ILogin): Observable<Itoken> {
    return  this.httpClient.post<Itoken>("http://localhost:8080/election/public/auth",
      loginObj,{  responseType: 'text' as 'json' });
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  refreshToken() {
    return this.httpClient
      .post<LoginResponse>(
        'http://localhost:8080/api/auth/refresh/token',
        this.refreshTokenPayload
      )
      .pipe(
        tap((response) => {
          this.localStorage.clear('authenticationToken');
          this.localStorage.clear('expiresAt');

          this.localStorage.store(
            'authenticationToken',
            response.authenticationToken
          );
          this.localStorage.store('expiresAt', response.expiresAt);
        })
      );
  }

  // logout() {
  //   this.httpClient
  //     .post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload, {
  //       responseType: 'text',
  //     })
  //     .subscribe(
  //       (data) => {
  //         console.log(data);
  //       },
  //       (error) => {
  //         throwError(error);
  //       }
  //     );
  //   this.localStorage.clear('authenticationToken');
  //   this.localStorage.clear('nom');
  //   this.localStorage.clear('refreshToken');
  //   this.localStorage.clear('expiresAt');
  // }
  logOut() {
    this.localDbService.token = "";
    this.router.navigate(['/login']);
  }

  getnom() {
    return this.localStorage.retrieve('nom');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
