import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthentificationService } from '../services/authentification.service';

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

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalConnexionComponent>,
    private cookieService: CookieService,
    private http: HttpClient,
    private authService: AuthentificationService
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
      .then((data: any) => {
        if (data.message === 'success') {
          this.cookieService.set('jwt', data.jwt, 1);
          this.authService.Get_User_info().then((data: any) => {
            console.log(this.authService.username);
            
            this.authService.is_connected = true;
          });
        } else {
          this.authService.is_connected = false;
          console.log('error login / password');
        }
      });
    this.dialogRef.close();
  }

  Get_User_sinistre() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const options = { headers, withCredentials: true };
    this.http
      .get<any>('http://127.0.0.1:8000/get_user_sinistre/7', options)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
