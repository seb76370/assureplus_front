import { Component, OnInit } from '@angular/core';
import { userInterface } from '../interface/user.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css'],
})
export class InfoUserComponent implements OnInit {
  datas: userInterface = {} as userInterface;
  infoUserForm: FormGroup = this.fb.group({
    first_name: '',
    last_name: '',
    street: '',
    zipcode: '',
    city: '',
    contract_number: '',
    description: '',
    phone_number: '',
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthentificationService
  ) {}

  ngOnInit(): void {
    if (this.authService.is_connected) {
      this.infoUserForm.patchValue({
        first_name: this.authService.first_name,
        last_name: this.authService.last_name,
        street: this.authService.street,
        zipcode: this.authService.zipcode,
        city: this.authService.city,
        contract_number: this.authService.contract_number,
        phone_number: this.authService.phone_number,
      });
    }
  }
}
