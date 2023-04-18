import { Component, Input } from '@angular/core';
import { unsuiviInterface } from '../interface/unsuivi.interface';
import { commentInterface, sinistreInterface } from '../interface/sinistres_user.interface';
import { environments } from 'src/environnements/env';
import {SinistreService} from '../services/sinistre.service'
@Component({
  selector: 'app-suivi-sinistre',
  templateUrl: './suivi-sinistre.component.html',
  styleUrls: ['./suivi-sinistre.component.css'],
})
export class SuiviSinistreComponent {
  @Input()
  sinistre !: sinistreInterface;

constructor(private sinistreService: SinistreService){}


  env = environments;
  url = this.env.urlimg
  newcomment:string = '';
  datas: unsuiviInterface = {
    id: 0,
    description: '',
    date_time: new Date(),
    files: [],
    comments: [],
  };



  add_comment(id: number) {
    this.sinistreService.Addcomment(id,this.newcomment)
    .subscribe((data:commentInterface)=> {
     console.log(data);
     
      this.sinistre.comments.push({
        id: data.id,
        sinistre_id: data.sinistre_id,
        comment: data.comment,
        date_time: data.date_time
      })

    })
  }
}
