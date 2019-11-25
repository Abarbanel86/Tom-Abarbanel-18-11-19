import { Injectable } from '@angular/core';

import { WeatherService } from './weather.service';
import { WeatherDataService } from './weather-data.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  suggestions: string[] = [];
  fiveDayDates: any[] = [];
  fiveDayMax: number[] = [];
  fiveDaysMin: number[] = [];
  
  constructor(private weatherService: WeatherService,
    private weatherDataService: WeatherDataService,
    private weatherData: WeatherDataService) { }

  searchByGeoLocation(lat: number, lng: number) {
    this.weatherService.getGeoLocation(lat, lng).subscribe((res) => {
      this.weatherData.setTopSearchID(JSON.parse(res["Key"]));
      this.weatherData.setLocationName(res["EnglishName"]);
      this.searchByID();
    });
  }
  
  searchByID() {
    var id = this.weatherData.getTopSearchID();

    this.weatherService.getFiveDays(id).subscribe((response) => {
      this.handleFiveDays(response);
    });
  }

  searchByName(phrase: string) {
    this.weatherService.getAutoComplete(phrase).subscribe((response) => {
      if(response['length'] > 0) {
        this.weatherData.setTopSearchID(response[0].Key);

        for(var i = 0; i < environment.numberOfSuggestions; ++i) {
          this.suggestions.push(response[i].LocalizedName);
        }
      } else {
        this.suggestions = ['Nothing by this name here...'];
      }

      this.weatherDataService.setSuggestions(this.suggestions);
    });
  }

  private handleFiveDays(response) {
    this.fiveDayDates = [];
    this.fiveDaysMin = [];
    this.fiveDayMax = [];

    for(let i = 0; i < environment.numberOfDays; ++i) {
      this.fiveDayDates.push
          (response["DailyForecasts"][i]["Date"]);
      this.fiveDaysMin.push
          (response["DailyForecasts"][i]["Temperature"]["Minimum"]["Value"]);
      this.fiveDayMax.push
          (response["DailyForecasts"][i]["Temperature"]["Maximum"]["Value"]);
    }

    this.weatherData.setFiveDaysDates(this.fiveDayDates);
    this.weatherData.setFiveMax(this.fiveDayMax);
    this.weatherData.setFiveMin(this.fiveDaysMin);
  }
}
