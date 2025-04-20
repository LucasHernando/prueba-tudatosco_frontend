import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { TokenService } from '../services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    const isAuthenticated = !!this.tokenService.getToken();

    if (!isAuthenticated) {
      return this.router.parseUrl('/login');
    }

    return true;
  }
}
