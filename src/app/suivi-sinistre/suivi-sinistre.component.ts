import { Component, Input, OnInit } from '@angular/core';
import { unsuiviInterface } from '../interface/unsuivi.interface';
import { sinistreInterface } from '../interface/sinistres_user.interface';

@Component({
  selector: 'app-suivi-sinistre',
  templateUrl: './suivi-sinistre.component.html',
  styleUrls: ['./suivi-sinistre.component.css'],
})
export class SuiviSinistreComponent implements OnInit {
  @Input()
  sinistre !: sinistreInterface;

  datas: unsuiviInterface = {
    id: 0,
    description: '',
    date_time: new Date(),
    files: [],
    comments: [],
  };


  ngOnInit(): void {
    console.log(this.sinistre);   
  }

  add_comment(id: number) {
    this.datas.comments.push({
      comment: 'commentaires 5555',
      date_time: new Date(),
    });
  }
}
