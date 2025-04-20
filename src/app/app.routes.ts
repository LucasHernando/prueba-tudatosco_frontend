import { Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';

import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { CreateUserComponent } from './features/user/create-user/create-user.component';
import { ListUserComponent } from './features/user/list-user/list-user.component';
import { EventListComponent } from './features/event-list/event-list.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UserProfileComponent } from './features/user-profile/user-profile.component';

export const routes: Routes = [

 

  // Ruta para el login
  {
    path: 'login',
    loadComponent: () =>
      import('./shared/login/login.component').then(m => m.LoginComponent)
  },

  //{ path: 'dashboard', component: LayoutComponent },

  { path: 'register', component: CreateUserComponent },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'events', component: EventListComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ]
  },

  // Wildcard: redirecciona cualquier ruta no encontrada a login
  { path: '**', redirectTo: 'login' }
];
