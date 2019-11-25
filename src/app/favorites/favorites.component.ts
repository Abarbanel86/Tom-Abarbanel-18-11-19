import { Component, OnInit } from '@angular/core';
import { Favorite } from '../models/Favorite';
import { DataService } from '../data.service';
import { WeatherDataService } from '../services/weather-data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  location: string ='';
  favorites: Favorite[] = [];
  curFav: Favorite;

  constructor(private data: DataService,
              private weatherData: WeatherDataService) { }

  ngOnInit() {
    this.favorites = this.data.getFavorites();
    this.curFav = this.favorites[0]; 
  }

}
