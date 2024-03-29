import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { AuthentificationService } from '../services/authentification.service';
import { ModalInfoComponent } from '../modal-info/modal-info.component';
import { LoginInterface } from '../interface/login.interface';

@Component({
  selector: 'app-modal-connexion',
  templateUrl: './modal-connexion.component.html',
  styleUrls: ['./modal-connexion.component.css'],
})
export class ModalConnexionComponent {
  loginForm: FormGroup;
  username: string = '';
  password: string = '';
  csrftoken: string = '';
  is_admin:boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalConnexionComponent>,
    private cookieService: CookieService,
    private http: HttpClient,
    private authService: AuthentificationService,
    public dialog: MatDialog,
  ) {
    this.loginForm = this.fb.group({
      emailOrUsername: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {

    this.authService
      .login(
        this.loginForm.value['emailOrUsername'],
        this.loginForm.value['password']
      )
      .then((data: LoginInterface) => {
        if (data.message === 'success') {

          if (data.jwt){
            this.cookieService.set('jwt', data.jwt, 1);
            this.authService.Get_User_info().then((data: any) => {
              this.authService.is_connected = true;
              this.authService.is_admin = data.is_admin
            });
          }else
          {
            this.authService.is_connected = false;
            this.dialog.open(ModalInfoComponent, {
              data: { message: "Erreur d'authentification"},
              width: '250px',
              height: '100px',
            });
          }
        } else {
         
          this.authService.is_connected = false;
          this.SendMessageInfo('Erreur de Login/mot de passe')
        }
      });
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
