import { Component } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.css'],
})
export class ModalInfoComponent {
  constructor(
    public authService: AuthentificationService,
    private dialogRef: MatDialogRef<ModalInfoComponent>
  ) {}

  closeInfo() {
    this.dialogRef.close();
  }
}
