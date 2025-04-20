import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CreateUserComponent } from '../../features/user/create-user/create-user.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertToastComponent } from '../alert-toast/alert-toast.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CreateUserComponent,
    AlertToastComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = false;
  showSuccess = false;
  showError = false;
  errorMessage = '';
  imagePath = './assets/tusdatos/tus_datos_co.png';

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private modalService: NgbModal) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  onLogin() {
    this.auth.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(success => {
      if (success.validate) {
        this.loginError = false;
        this.router.navigate(['/']);
      } else {
        this.loginError = true;

        console.log("success?.data?.message", success)
        this.errorMessage = success?.data?.message || 'Failed to authenticate';
        
        this.showError = true;
          setTimeout(() => (this.showError = false), 3000);
      }
    })}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Login:', { email, password });
        this.onLogin()
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  onRegister(): void {
    console.log('Redirigir a crear cuenta');
      this.router.navigate(['/register']);
  }



  openModal() {
    const modalRef = this.modalService.open(CreateUserComponent, { size: 'lg' });

    modalRef.result.then(
      (result) => {
        if (result === 'created') {
          this.showSuccess = true;
          setTimeout(() => (this.showSuccess = false), 3000);
        }
      },
      (reason) => {
        if (reason === 'error') {
          this.errorMessage = 'Ocurrió un error al crear el usuario.';
          this.showError = true;
          setTimeout(() => (this.showError = false), 3000);
        }
      }
    );
  }
}
