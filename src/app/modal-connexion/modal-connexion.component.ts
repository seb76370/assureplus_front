import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-connexion',
  templateUrl: './modal-connexion.component.html',
  styleUrls: ['./modal-connexion.component.css']
})
export class ModalConnexionComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private dialogRef: MatDialogRef<ModalConnexionComponent>) {
    this.loginForm = this.fb.group({
      emailOrUsername: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    
    let raw = JSON.stringify({
      "username": this.loginForm.value['emailOrUsername'],
      "password": this.loginForm.value['password']
    });
    
    let requestOptions:any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://127.0.0.1:8000/dj-rest-auth/login/", requestOptions)
      .then(response => response.text())
      .then(result => {
      if (result.includes('key'))
      {
        alert("login ok")
      }else
      {
        alert("login ko")
      }
    })
      .catch(error => console.log('error', error));

    this.dialogRef.close();
    
    console.log(this.loginForm.value);
    this.dialogRef.close();
  }
}
