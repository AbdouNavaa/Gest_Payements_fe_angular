import { Injectable } from '@angular/core';
import {LocalStorageService} from "ngx-webstorage";

@Injectable({
  providedIn: 'root'
})
export class LocalDbService {

  private _token: string = "";
  private _userRole: string = "";

  constructor(private localStorage: LocalStorageService) {
    if (
      sessionStorage.getItem("token") &&
      sessionStorage.getItem("token") != "undefined"
    ) {
      const token = JSON.parse(sessionStorage.getItem("token") || '{}');
      this.token = token.access_token;
      this.userRole = token.role;
    }
  }

  get token() {
    return this._token;
  }

  set token(value) {
    this._token = value;
  }

  get userRole() {
    return this._userRole;
  }

  set userRole(value) {
    this._userRole = value;
  }
  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }
  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }


}
