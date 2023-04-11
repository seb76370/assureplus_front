import { Component, OnInit } from '@angular/core';
import { sinistreUserInterface } from '../interface/sinistresuser.interface';
import { environments } from '../../environnements/env';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.css']
})
export class SuiviComponent implements OnInit {

  
  sinitres_id:number[]= [];

  constructor(public authService:AuthentificationService){}

  ngOnInit(): void {

    this.sinitres_id = [
      7,8,9,4,5,7
    ]
 
  }

}


