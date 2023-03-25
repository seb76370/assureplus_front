import { Component, OnInit } from '@angular/core';
import { FindpoiService } from '../findpoi.service';
import { location_gps_on_ggole_map } from './script';
import { environments } from '../../environnements/env';

@Component({
  selector: 'app-resultpoi',
  templateUrl: './resultpoi.component.html',
  styleUrls: ['./resultpoi.component.css'],
})
export class ResultpoiComponent implements OnInit {
  apiUrl = 'https://api.tomtom.com/search/2/categorySearch';
  datas: [] = [];
  latitude: number = 0;
  longitude: number = 0;
  api_key: string = environments.apiKey;
  showCell:boolean = false;
  constructor(private findpoiService: FindpoiService) {}
  ngOnInit() {
    location_gps_on_ggole_map()
      .then((location) => {
        this.latitude = location.latitude;
        this.longitude = location.longitude;

        const places = this.findpoiService.localisation_poi(
          this.api_key,
          this.latitude,
          this.longitude,
          10000,
          'REPAIR_FACILITY'
        );
        places.subscribe((datas: any) => {
          this.datas = datas['results'];
          console.log(this.datas);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleClick(item:any) 
  {
    // faire quelque chose avec l'élément de données cliqué
    const latitude:number = +item["position"]["lat"];
    const longitude:number = +item["position"]["lon"];
    location_gps_on_ggole_map(latitude,longitude)
  }
}


