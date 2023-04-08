import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { userInterface } from '../interface/user.interface';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sinistre',
  templateUrl: './sinistre.component.html',
  styleUrls: ['./sinistre.component.css'],
})
export class SinistreComponent implements OnInit {
  fileName = '';
  

  datas: userInterface = {} as userInterface;
  sinistreForm: FormGroup = this.fb.group({
    first_name: '',
    last_name: '',
    street: '',
    zipcode: '',
    city: '',
    contract_number: '',
    description: ''
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthentificationService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (this.authService.is_connected) {
      
      this.authService
        .Get_User_info()
        .then((data: userInterface) => {
          this.datas = data
          this.sinistreForm.patchValue({
            first_name: data.first_name,
            last_name: data.last_name,
            street: data.street,
            zipcode: data.zipcode,
            city: data.city,
            contract_number: data.contract_number,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("not connectedddd");
      
      this.router.navigate(['']);
    }
  }

  onFileSelected(event: any) {

    const files:FileList = event.target.files;
    const formData = new FormData();
    formData.append("sinistre", "2");
    formData.append("title", "test");

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]; 
        formData.append("file", file); 
      }

      const upload$ = this.http.post("http://127.0.0.1:8000/upload_file/", formData);
      upload$.subscribe();
    }
  }
  


}
