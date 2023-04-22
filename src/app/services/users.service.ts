import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environnements/env';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  env = environments;
  constructor(private http: HttpClient) {}

  adduser(form: FormData) {
    const url = this.env.url + 'api/register/';
    return this.http.post(url, form);
  }
}
