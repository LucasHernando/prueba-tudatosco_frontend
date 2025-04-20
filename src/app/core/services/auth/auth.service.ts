import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginResponse } from '../../models/auth/responses/login-response.interface';


export interface DataResponse {
  data: LoginResponse | null;  
  validate: boolean;
}


@Injectable({
  providedIn: 'root'
})




export class AuthService {

  private API_URL = 'http://localhost:8082/api/login';
  

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<DataResponse> {
    return this.http.post<LoginResponse>(this.API_URL, { email, password }).pipe(
      map(res => {
        const token = res?.data?.access_token;
        const email = res?.data?.email;
        
        const response: DataResponse = {
          data: res,
          validate: false
        };

        if (token) {
          localStorage.setItem('access_token', token);
          localStorage.setItem('user_email', email);
          response.validate = true
          
        }
        return response;
      }),
      catchError(err => {
        const response: DataResponse = {
          data: null,
          validate: false
        };
        return of(response);
      })
    );
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getUser(): string | null {
    return localStorage.getItem('user_email');
  }
}
