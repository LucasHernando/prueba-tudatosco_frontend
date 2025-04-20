import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../core/services/token/token.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {


  constructor(private token: TokenService) {}



  @Input() username: string ='';
  @Output() logout = new EventEmitter<void>();
  @Output() toggleSidebar = new EventEmitter<void>();

  ngOnInit(): void {
    if (!this.username) {
      this.username = this.token.getEmailAuth();
    }
  }
  
  onLogout(): void {
    this.logout.emit();
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }
}
