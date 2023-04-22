import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environnements/env';
import {userlist} from '../interface/userlist.interface'
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

  listuser():Observable<userlist[]> {
    const url = this.env.url + 'api/listuser/';
    return this.http.get<userlist[]>(url);
  }

}
