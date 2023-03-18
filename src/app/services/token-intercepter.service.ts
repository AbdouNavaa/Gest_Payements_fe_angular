import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService implements HttpInterceptor{

  constructor() { }
   token='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYWxlbUBnbWFpbC5jb20iLCJpYXQiOjE2Nzg4NzgxNjksImV4cCI6MTY3ODg3OTYwOX0.pcIM7GfEj2lAd29PmPp31qXvb7rKEP87g0O29MLrn38'
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let tokenheader = req.clone({
      setHeaders: {
      
      }
    });
   return next.handle(tokenheader)
  }
}
