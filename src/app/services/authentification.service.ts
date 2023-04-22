import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs';
import { ModalInfoComponent } from '../modal-info/modal-info.component';
import { userInterface } from '../interface/user.interface';
import { environments } from '../../environnements/env';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  is_connected: boolean = false;
  id: string = '';
  username: string = '';
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  street: string = '';
  zipcode: string = '';
  city: string = '';
  contract_number: number = 0;
  phone_number: string = '';
  is_admin:boolean = false;
  env = environments

  visibleSpinner: boolean = false;

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    public dialog: MatDialog
  ) {}


  login(username: string, password: string): Promise<any> {
    this.visibleSpinner = true;
    const url = this.env.url + 'api/login/';
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',      
    });
  
    const body = JSON.stringify({
      email: username,
      password: password
    });
  
    return new Promise((resolve, reject) => {
      this.http.post(url, body, { headers })
        .subscribe(
          (data) => {
            this.is_connected = true;
            resolve(data);
            console.log(data);
            this.visibleSpinner = false;
          },
          (err) => {
            this.is_connected = false;
            reject(err);
          }
        );
    });
  }

  logout(): void {
    this.visibleSpinner = true;
    let requestOptions: any = {
      method: 'POST',
      redirect: 'follow',
    };
    const url = this.env.url + 'api/logout/';
    fetch(url, requestOptions)
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
      })
      .then(()=> this.visibleSpinner = false);
  }

  Get_User_info(): Promise<userInterface> {
    this.visibleSpinner = true;
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

    const url = this.env.url + 'api/user/';
    console.log("url",url);
    
    return new Promise((resolve, reject) => {

      fetch(url, requestOptions)
        .then((response) => {                 
          return response.json();
        })
        .then((data) => {
          console.log("data",data);
          // delete data['is_admin'];
          this.id = data['id'];
          this.username = data['username'];
          this.first_name = data['first_name'];
          this.last_name = data['last_name'];
          this.email = data['email'];
          this.street = data['street'];
          this.zipcode = data['zipcode'];
          this.city = data['city'];
          this.contract_number = data['contract_number'];
          this.phone_number = data['phone_number'];
          this.is_admin = data['is_admin'];
          resolve(data);
        })
        .then(()=> this.visibleSpinner = false)
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

    const url = this.env.url + 'api/reset/';

    //Make the HTTP request
    // this.http
    //   .post(url, body, httpOptions)
    //   .pipe(tap((data) => console.log('data', data)))
    //   .subscribe(
    //     (response) => console.log(response),
    //     (error) => console.log(error)
    //   );

    return this.http.post<Object>(url, body, httpOptions)
  


  }
}
