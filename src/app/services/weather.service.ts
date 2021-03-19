import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: HttpClient) { }

  getWeather(): Observable<any> {
    let headers = new HttpHeaders()
    headers.set('id', environment.cityId);
    headers.set('appid', environment.apiKey);
    return this._http.get(environment.weatherUrl, { headers: headers });
  }
}
