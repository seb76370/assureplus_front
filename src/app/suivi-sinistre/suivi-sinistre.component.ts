import { Component, Input, OnInit } from '@angular/core';
import { unsuiviInterface } from '../interface/unsuivi.interface';

@Component({
  selector: 'app-suivi-sinistre',
  templateUrl: './suivi-sinistre.component.html',
  styleUrls: ['./suivi-sinistre.component.css'],
})
export class SuiviSinistreComponent implements OnInit {
  @Input()
  idSinistre: any;

  datas: unsuiviInterface = {
    description: '',
    date_time: new Date(),
    files: [],
    comments: [],
  };

  ngOnInit(): void {
    this.datas = {
      description:'vfnrekjhfvnbrelkifvnhbelvfhnerbfezklbfezlfbzefejfebznfnezbfezlfkeb',
      date_time: new Date(),
      files: ['assets/assur1.jpg', 'assets/assur2.jpg','assets/assur1.jpg', 'assets/assur2.jpg',],
      comments:[{
        comment:"commentaires 1",
        date_time:new Date()
      },{
        comment:"commentaires 2",
        date_time:new Date()
      }
    ]
    };
  }
}
