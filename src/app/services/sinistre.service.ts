import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { environments } from '../../environnements/env';
import { SinistreWriteInterface } from '../interface/sinistre.interface';
import { Observable, map, tap } from 'rxjs';
import { sinistreUserInterface } from '../interface/sinistresuser.interface';

@Injectable({
  providedIn: 'root',
})
export class SinistreService {
  env = environments;
  datas: any
  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    public dialog: MatDialog
  ) {}

  save_sinistre(user: string, description: string) {
    const formData = new FormData();
    formData.append('user', user);
    formData.append('description', description);

    const url = this.env.url + 'save_sinistre/';

    return this.http.post(url, formData);
  }

  upload_files(sinistreid: string, title: string, files: FileList) {
    const formData = new FormData();
    formData.append('sinistre', sinistreid);
    formData.append('title', title);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formData.append('file', file);
    }

    return this.http.post<SinistreWriteInterface>(
      'http://127.0.0.1:8000/upload_file/',
      formData
    );
  }

  GetSinitres(id: number):any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      jwt: this.cookieService.get('jwt'),
    });

    const requestOptions: any = {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
    };

    const url = this.env.url + 'get_user_sinistre/' + id;
    return this.http.get(url, requestOptions)

  }
}
