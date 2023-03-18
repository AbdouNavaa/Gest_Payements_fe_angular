import {Component, Injectable, OnInit} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {catchError, Observable, of} from 'rxjs';
import {LocalDbService} from "../auth/local-db.service";
import {AuthService} from "../auth/services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {UtilService} from "../auth/util.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class  NavbarComponent implements OnInit{

  constructor(public localDbService: LocalDbService,
              private router:Router,
              private authentificationService: AuthService,private util:UtilService) {}
  ngOnInit(): void {
  }

  LogOut() {
    this.authentificationService.logout()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('Une erreur est survenue lors de la déconnexion : ', error);
          return of(null);
        })
      )
      .subscribe(() => {
        this.localDbService.token = "";
        this.router.navigate(['/login']);

      });
  }
  onLogout() {
    this.authentificationService.logout()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('Une erreur est survenue lors de la déconnexion : ', error);
          return of(null);
        })
      )
      .subscribe(() => {
        this.localDbService.token = "";
        this.util.navigateByUrl("login");
      });
  }

}
