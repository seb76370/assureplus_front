import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  adduser(form: FormData) {
    //const url = this.env.url + 'api/register/';
    const url = 'http://127.0.0.1:8000/api/register/';
    return this.http.post(url, form);
  }
}
