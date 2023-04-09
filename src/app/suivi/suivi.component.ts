import { Component, OnInit } from '@angular/core';
import { sinistreUserInterface } from '../interface/sinistresuser.interface';
import { environments } from '../../environnements/env';

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.css']
})
export class SuiviComponent implements OnInit {

  datas?:sinistreUserInterface;
  urlImage = environments.urlImage
  
  ngOnInit(): void {

    this.datas =  
    {
        "id": 2,
        "user_id": 7,
        "description": "test upload angular",
        "date_time": "2023-04-08T23:31:00.761Z",
      "comments": [
      {
        "id": 1,
        "sinistre_id": 2,
        "comment": "new comment",
        "date_time": "2023-04-09T21:54:09.670Z"
      },      {
        "id": 2,
        "sinistre_id": 2,
        "comment": "new comment2",
        "date_time": "2023-03-09T21:54:09.670Z"
      }],
      "files": [
      {
          "id": 1,
          "sinistre_id": 2,
          "title": "test",
          "file": "uploads/2023/04/08/Capture_décran_1.png",
          "date_time": "2023-04-08T23:45:04.827Z"
      },
      {
          "id": 2,
          "sinistre_id": 2,
          "title": "test-title",
          "file": "uploads/2023/04/08/boitier.jpg",
          "date_time": "2023-04-08T23:47:56.207Z"
      }]
    }
  
  
  }

}


