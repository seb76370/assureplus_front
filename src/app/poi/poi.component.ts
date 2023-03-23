import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poi',
  templateUrl: './poi.component.html',
  styleUrls: ['./poi.component.css']
})
export class PoiComponent  implements OnInit {
  latitude: number = 0;
  longitude: number = 0;

  ngOnInit() {


    if (navigator.geolocation) 
    {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        const map = document.querySelector("#map iframe");
       
        const url = `https://maps.google.com/maps?width=700&height=440&hl=en&q=${this.latitude} ${this.longitude}+(Titre)&ie=UTF8&t=&z=10&iwloc=B&output=embed`;
        if (map instanceof HTMLIFrameElement) {
          map.src = url;
        }
  


      });
    } 
    else 
    {
      console.log("La géolocalisation n'est pas prise en charge par ce navigateur.");
    }
  }
}
