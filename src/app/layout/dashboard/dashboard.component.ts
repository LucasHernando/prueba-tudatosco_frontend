import { Component, ViewChild } from '@angular/core';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../core/services/token/token.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    NavbarComponent,
    SidebarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  username: string = '';

  

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private router: Router, private token: TokenService) {}

  ngOnInit(): void {
    if (!this.username) {
      this.username = this.token.getEmailAuth();
    }
  }

  toggleSidebar() {
    this.sidenav.toggle();
  }

  logout(): void {
    console.log('Cerrando sesión...');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
