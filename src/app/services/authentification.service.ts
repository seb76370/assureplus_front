import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs';
import { ModalInfoComponent } from '../modal-info/modal-info.component';
import { userInterface } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  is_connected: boolean = false;
  username: string = '';
  contract_number: number = 0;

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    public dialog: MatDialog
  ) {}

  login(username: string, password: string) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let raw = JSON.stringify({
      email: username,
      password: password,
    });

    let requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    return new Promise((resolve, reject) => {
      fetch('http://127.0.0.1:8000/api/login/', requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.is_connected = true;
          resolve(data);
        })
        .catch((err) => {
          this.is_connected = false;
          reject(err);
        });
    });
  }

  logout(): void {
    console.log('logout');
    let requestOptions: any = {
      method: 'POST',
      redirect: 'follow',
    };

    fetch('http://127.0.0.1:8000/api/logout/', requestOptions)
      .then((response) => {
        this.is_connected = false;
        this.username = '';
        this.contract_number = 0;
        this.cookieService.delete('jwt');
        return response.json();
      })
      .then(() => {
        this.dialog.open(ModalInfoComponent, {
          data: { message: 'Vous êtes déconnecté' },
          width: '250px',
          height: '100px',
        });
      });
  }

  Get_User_info(): Promise<userInterface> {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let raw = JSON.stringify({
      jwt: this.cookieService.get('jwt'),
    });

    const requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    return new Promise((resolve, reject) => {
      fetch('http://127.0.0.1:8000/api/user/', requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          delete data['is_admin'];
          this.username = data['username'];
          this.contract_number = data['contract_number'];
          resolve(data);
        })
        .catch((err) => {
          reject('not_connected');
        });
    });
  }

  ResetPassword(Newpassword: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const body = {
      jwt: this.cookieService.get('jwt'),
      password: Newpassword,
    };

    // Make the HTTP request
    this.http
      .post('http://localhost:8000/api/reset/', body, httpOptions)
      .pipe(tap((data) => console.log('data', data)))
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
}
