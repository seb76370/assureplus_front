import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { SinistreService } from '../services/sinistre.service';
import { userInterface } from '../interface/user.interface';
import { Router } from '@angular/router';
import { ModalInfoComponent } from '../modal-info/modal-info.component';
import { MatDialog } from '@angular/material/dialog';
import { SinistreWriteInterface } from '../interface/sinistre.interface';

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
    phone_number: '',
  });

  files!: FileList;

  constructor(
    private fb: FormBuilder,
    private authService: AuthentificationService,
    private sinistreService: SinistreService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.authService.is_connected) {
      this.sinistreForm.patchValue({
        first_name: this.authService.first_name,
        last_name: this.authService.last_name,
        street: this.authService.street,
        zipcode: this.authService.zipcode,
        city: this.authService.city,
        contract_number: this.authService.contract_number,
        phone_number: this.authService.phone_number,
      });
    } else {
      console.log('not connectedddd');
      this.router.navigate(['']);
    }
  }

  onFileSelected(event: any) {
    this.files = event.target.files;
    this.fileName = this.files.length + ' fichiers Selectionnées';
  }

  save() {
    const description = this.sinistreForm.get('description')?.value;
    if (this.authService.id) {
      const sinistre = this.sinistreService.save_sinistre(
        this.authService.id,
        description
      );
      sinistre.subscribe((data: any) => {
        if (this.files && this.files.length > 0) {
          const upload = this.sinistreService.upload_files(
            data['id'],
            'sauvegarde sinistres',
            this.files
          );
          upload.subscribe((data: SinistreWriteInterface) => {
            if (data.statusCode == '200') {
              this.dialog.open(ModalInfoComponent, {
                data: { message: 'Enregistrement du sinistre terminé' },
                width: '250px',
                height: '100px',
              });

              const emptyFileList = new DataTransfer().files;
              this.files = emptyFileList;

              const descriptionControl: any =
                this.sinistreForm.get('description');
              descriptionControl.patchValue('');
              this.fileName = 'Aucun fichier Sélectionné.';
            } else {
              this.dialog.open(ModalInfoComponent, {
                data: { message: "Erreur d'enregistrement du sinsitre" },
                width: '250px',
                height: '100px',
              });
            }
          });
        }
      });
    }
  }
}
