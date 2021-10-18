import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class HttpJWTInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const bearerToken = localStorage.getItem("access_token");
    if(this.authService.getAuthStatus() && bearerToken){
      request = request.clone(
        { 
          setHeaders: {
            Authorization: `Bearer ${bearerToken}`
          } 
        }
      );
    }
    return next.handle(request);
  }
}
