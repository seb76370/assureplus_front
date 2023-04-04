import { Component } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-reset-password',
  templateUrl: './modal-reset-password.component.html',
  styleUrls: ['./modal-reset-password.component.css']
})
export class ModalResetPasswordComponent {
  loginForm: FormGroup;
  newPassword:string = '';

  constructor(private authService: AuthentificationService,
    private dialogRef: MatDialogRef<ModalResetPasswordComponent>,
    private fb: FormBuilder,) {
    this.loginForm = this.fb.group({
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.authService
      .ResetPassword(this.loginForm.value['password'])
      this.dialogRef.close();
  }

}
