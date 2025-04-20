import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { UserProfile } from '../../core/models/auth/responses/login-response.interface';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  userProfile!: UserProfile;
  isLoading = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((data) => {
      this.userProfile = data;
      this.isLoading = false;
    });
  }

  getRolesString(): string {
    return this.userProfile?.roles?.map(r => r.name).join(', ') || '';
  }
}
