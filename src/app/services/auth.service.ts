import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import jwt_decode from "jwt-decode";
const baseUrl = 'http://localhost:3000'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    return this.http.post(`${baseUrl}/api/v1/auth/login`, {
      email: email,
      password: password
    }).pipe(
      map(response => {
        let _: any = response;
        let access_token = _["access_token"]
        localStorage.setItem("access_token", access_token)
      }))
  }
  // discombobulate
  logout(){
    localStorage.removeItem("access_token");
  }

  setAccessToken(access_token: string) {
    localStorage.setItem('access_token', access_token)
  }

  getAuthStatus(): boolean {
    let access_token: any = localStorage.getItem("access_token");
    if(localStorage.getItem("access_token") == null) return false;
    let decodedJwt:any = jwt_decode(access_token)
    return moment(decodedJwt["iat"]).isBefore(decodedJwt["exp"]);
  }

}
