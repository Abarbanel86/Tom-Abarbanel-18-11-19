import { Component, OnInit } from '@angular/core';

import { DataService } from '../../data.service';
import { WeatherDataService } from '../../services/weather-data.service';
import { Favorite } from '../../models/Favorite';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  lat: number;
  lng: number;
  location: string;
  doneLoading: boolean = false;
  favorites: Favorite[] = [];

  days: number[] = [0, 1, 2, 3, 4];
  tempMin: number[] = [];
  tempMax: number[] = [];
  dates: any[] = [];

  constructor(private data: DataService,
              private weatherData: WeatherDataService,
              private searchService: SearchService) { }

  ngOnInit() {
    this.weatherData.currentFiveDates.subscribe(() => {
      this.dates = this.weatherData.getFiveDates();
    });
    this.weatherData.currentFiveMax.subscribe(() => {
      this.tempMax = this.weatherData.getFiveMax();
    });
    this.weatherData.currentFiveMin.subscribe(() => {
      this.tempMin = this.weatherData.getFiveMin();
    });
    this.weatherData.currentLocationName.subscribe(() => {
      this.location = this.weatherData.getLocationName();
    })

    this.getLocation();
  }

  addToFavorites(){
    var fav: Favorite = {
      name: this.weatherData.getLocationName(),
      id: this.weatherData.getTopSearchID(),
      maxTemp: this.weatherData.getFiveMax()[0],
      minTemp: this.weatherData.getFiveMin()[0]
    }

    this.favorites.push(fav);
    this.data.setFavorites(this.favorites);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.lng = pos.coords.longitude;
        this.lat = pos.coords.latitude;
        this.displayFirstWeather();
      }
      ,(err) => {
        this.lat = 32.1;
        this.lng = 34.777;
        this.displayFirstWeather();
      });
    }
  }

  displayFirstWeather() {
    this.searchService.searchByGeoLocation(this.lat, this.lng);

    this.doneLoading = true;
  }
}
