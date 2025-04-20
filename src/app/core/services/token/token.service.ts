import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken(): string {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token') || '';
    }
    return '';
  }

  getEmailAuth(): string {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('user_email') || '';
    }
    return '';
  }
}
