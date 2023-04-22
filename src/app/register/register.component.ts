import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environments } from 'src/environnements/env';
import { format } from 'date-fns';
import { NgForm } from '@angular/forms';
import { ModalInfoComponent } from '../modal-info/modal-info.component';
import { MatDialog } from '@angular/material/dialog';
import {UsersService} from '../services/users.service'
import { catchError, of, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  env = environments;
  first_name: string = "";
  last_name: string = "";
  email: string = "";
  street:string = "";
  zipcode:string = "";
  city:string = "";
  phone_number:string = "";
  contract_number: string = "";
  password:string = "";

 
  constructor(private http: HttpClient,
    public dialog: MatDialog,
    private usersService: UsersService){
    const date = new Date();
    this.contract_number = format(date, 'ddMMmmss');
  }
  
  submitForm(form: NgForm) {
    
    let record_error:boolean =false;

    if (form.valid)
    {

      const formData = new FormData();
      formData.append('username', this.first_name + " " + this.last_name);
      formData.append('first_name', this.first_name);
      formData.append('last_name', this.last_name);
      formData.append('email', this.email);
      formData.append('street', this.street);
      formData.append('zipcode', this.zipcode);
      formData.append('city', this.city);
      formData.append('phone_number', this.phone_number);
      formData.append('contract_number', this.contract_number);    
      formData.append('password', this.password);    
  
      this.usersService.adduser(formData)
      .pipe(
        tap((data)=> console.log(data)),
        catchError((error) => {
          let errs:string = "";
          for (const key in error.error) {
           errs = errs + error.error[key][0]
          }
          this.SendMessageInfo (errs)
          record_error = true
          return of(null);
        }))
      .subscribe((data) => {
        if (!record_error)
        {
          this.SendMessageInfo ("Enregistrement OK")
        }
      });
       
    }else
    {
      this.SendMessageInfo ("Erreur dans le formulaire")
    }

}

SendMessageInfo(message:string)
{
  this.dialog.open(ModalInfoComponent, {
    data: { message: message },
    width: '300px',
    height: '150px',
  });
}

}
