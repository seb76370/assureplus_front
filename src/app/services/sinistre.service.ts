import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { environments } from '../../environnements/env';

@Injectable({
  providedIn: 'root',
})
export class SinistreService {
  env = environments;

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

  upload_files(sinistreid:string, title:string, files: FileList) {
    const formData = new FormData();
    formData.append('sinistre', sinistreid);
    formData.append('title', title);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append('file', file);
      }

      return this.http.post(
        'http://127.0.0.1:8000/upload_file/',
        formData
      );
  }
}
