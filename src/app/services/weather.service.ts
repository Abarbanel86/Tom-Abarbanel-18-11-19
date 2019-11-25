import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DataService } from '../data.service';
import { map, retry, catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient,
              private data: DataService) { }

  getAutoComplete(phrase: string) {
    let url = environment.autoCompleteURL + environment.apiKey + 
        "&q=" + phrase + environment.language;

    return this.http.get(url)
  }

  getFiveDays(locationKey: number) {
    let metric:boolean = this.data.getTempFormat();
    let url: string = 
          environment.fiveDaysURL + locationKey + environment.apiKey 
          + environment.language + '&details=true' + '&metric=' + metric;

    this.data.setFiveDaysSearchWasMade(true);

    return this.http.get(url)
  }

  getGeoLocation(lat: number, lng: number) {
    let url: string =
      environment.geoLocationURL + environment.apiKey + '&q=' + lat.toString()
       + ','+ lng.toString() +environment.language + environment.searchDetails 
       + environment.searchTopLevel;

    return this.http.get(url)
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);

    return throwError(errorMessage);
  }
}
