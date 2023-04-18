import { Component } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ModalInfoComponent } from '../modal-info/modal-info.component';

@Component({
  selector: 'app-modal-reset-password',
  templateUrl: './modal-reset-password.component.html',
  styleUrls: ['./modal-reset-password.component.css'],
})
export class ModalResetPasswordComponent {
  loginForm: FormGroup;
  newPassword: string = '';

  constructor(
    private authService: AuthentificationService,
    private dialogRef: MatDialogRef<ModalResetPasswordComponent>,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.loginForm = this.fb.group({
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const reset = this.authService.ResetPassword(
      this.loginForm.value['password']
    );
    
    reset.subscribe()
      this.SendMessageInfo("Mot de passe Modifié avec success")

    this.dialogRef.close();
  }


  SendMessageInfo(message:string)
  {
    this.dialog.open(ModalInfoComponent, {
      data: { message: message },
      width: '250px',
      height: '100px',
    });
  }

}
