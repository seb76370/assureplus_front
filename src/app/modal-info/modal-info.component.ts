import { Component, Inject } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {InfoMessage} from "../interface/info.interface"

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.css'],
})
export class ModalInfoComponent {

  constructor(
    public authService: AuthentificationService,
    private dialogRef: MatDialogRef<ModalInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InfoMessage,
  ) {}

  closeInfo() {
    this.dialogRef.close();
  }
}
