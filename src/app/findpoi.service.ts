import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FindpoiService {

  constructor(private http: HttpClient) { }


 localisation_poi(api_key:string, latitude:number, longitude:number, radius:number, type:string) 
 {
    const apiUrl = 'https://api.tomtom.com/search/2/categorySearch';

  
    const url = `${apiUrl}/${type}.json?key=${api_key}&lat=${latitude}&lon=${longitude}&radius=${radius}`;

    
    return this.http.get(url);
 
  }
}
