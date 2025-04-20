import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CreateUserRequest } from '../models/user/request/create-user-request.interface';
import { UserProfile } from '../models/auth/responses/login-response.interface';
import { TokenService } from './token/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8082/api/users';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  createUser(user: CreateUserRequest): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }


  getUserProfile(): Observable<UserProfile> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{ data: UserProfile }>(this.apiUrl, { headers }).pipe(
      map(response => response.data)
    );
  }
}
