import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  userForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public activeModal: NgbActiveModal
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatch });
  }

  passwordsMatch(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  onSubmit() {
    this.submitted = true;

    if (this.userForm.valid) {
      const { email, password } = this.userForm.value;
      this.userService.createUser({ email, password }).subscribe({
        next: () => {
          this.activeModal.close('created');
        },
        error: (err) => {
          this.activeModal.dismiss('error')
          console.error('Error al crear usuario', err);
        }
      });
    }
  }

  close() {
    this.activeModal.dismiss();
  }
}
