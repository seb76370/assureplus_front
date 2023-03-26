import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  constructor(private http: HttpClient) { }

  name: string = "";
  email: string = "";
  phone: string = "";
  message: string = "";

  submitForm() {

      const url = 'http://127.0.0.1:3000/test/';
      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('email', this.email);
      formData.append('phone', this.phone);
      formData.append('message', this.message);
      this.http.post(url, formData).subscribe((response) => {
        console.log(response);
      });  
  }
}
