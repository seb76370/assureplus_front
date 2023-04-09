import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { SinistreService} from '../services/sinistre.service';
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
    description: '',
    iduser: ''
  });

  files!:FileList

  constructor(
    private fb: FormBuilder,
    private authService: AuthentificationService,
    private sinistreService: SinistreService,
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
            iduser:data.id
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
    this.files = event.target.files;
    this.fileName = this.files.length + " fichiers Selectionnées"
  }
  

save()
{
  const iduser = this.sinistreForm.get('iduser')?.value
  const description = this.sinistreForm.get('description')?.value
  if (iduser){

    const sinistre = this.sinistreService.save_sinistre(iduser,description)
    sinistre.subscribe((data:any)=>{

      if (this.files && this.files.length > 0) {
        console.log(this.files);
        const upload = this.sinistreService.upload_files(data['id'], "sauvegarde sinistres",this.files)
        upload.subscribe((data)=>{
          console.log(data);
          
        })
      }   
    })
  }
}


}
