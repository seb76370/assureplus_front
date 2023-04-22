import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { SinistreService } from '../services/sinistre.service';
import { sinistreUserInterface } from '../interface/sinistresuser.interface';
import { sinistre_UserInterface } from '../interface/sinistres_user.interface';
import { MatSelectChange } from '@angular/material/select';
import {userlist} from '../interface/userlist.interface'
import {UsersService} from '../services/users.service'



@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.css'],
})
export class SuiviComponent implements OnInit {
  sinitres_id: number[] = [];
  number_sinistres:number = 0;
  count_sinistres:number = 0;
  datas: sinistre_UserInterface = {
    id: 0,
    first_name: '',
    last_name: '',
    street: '',
    zipcode: '',
    city: '',
    date_time: '',
    contract_number: '',
    sinistres: [],
  };

  users: userlist[] = [];

  constructor(
    public authService: AuthentificationService,
    public sinistreService: SinistreService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {


    this.authService.visibleSpinner = true
    this.authService.Get_User_info()
    .then((data: any) => {
      if (!this.authService.is_admin)
      {
        this.get_sinistres(data.id)
      }else{
        this.usersService.listuser()
        .subscribe((data)=>{
          this.users = data;
        })
      }
    });

  }


  OnUserChange(event: MatSelectChange) {


    this.get_sinistres(event.value)
    }

  get_sinistres(id:number)
  {
    this.sinistreService
    .GetSinitres(id)
    .subscribe((datas: sinistre_UserInterface) => {
      if (datas != undefined) {

        this.datas.id = datas.id;
        this.datas.first_name = datas.first_name
        this.datas.last_name = datas.last_name
        this.datas.street = datas.street
        this.datas.zipcode = datas.zipcode
        this.datas.city = datas.city
        this.datas.date_time = datas.date_time
        this.datas.contract_number = datas.contract_number
        this.datas.sinistres = datas.sinistres
        this.number_sinistres = datas.sinistres.length;
      }

    });
  }

  updatespinner(){
    this.count_sinistres++;
    if (this.count_sinistres == this.number_sinistres )
    {
      this.authService.visibleSpinner = false
    }
  }


}


