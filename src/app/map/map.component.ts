import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  ngOnInit() {

    const map = document.querySelector("iframe");
    console.log(map?.parentNode);
    

  }

}
