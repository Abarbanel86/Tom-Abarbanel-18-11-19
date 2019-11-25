import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { Favorite } from './models/Favorite';

import { WeatherDataService } from './services/weather-data.service';

@Injectable({
  providedIn: 'root'
})

export class DataService { 
  private fiveDaysSearchWasMade = new BehaviorSubject<boolean>(false);
  wasFiveDaysMade = this.fiveDaysSearchWasMade.asObservable();

  private favorites = new BehaviorSubject<Favorite[]>([]);
  currentFavorites = this.favorites.asObservable();

  private isCelsius = new BehaviorSubject(true);
  currentFormat = this.isCelsius.asObservable();

  private searchTerm = new BehaviorSubject('');
  currentSearchTerm = this.searchTerm.asObservable();


  constructor(private weatherData: WeatherDataService) { }

  setTempFormat() :void {
    this.weatherData.handleFormatChange(!this.isCelsius.value);
    this.isCelsius.next(!this.isCelsius.value);
  }

  getTempFormat(): boolean {
    return this.isCelsius.value;
  }

  getCurrentSearchTerm(): string {
    return this.searchTerm.value;
  }

  setSearchTerm(phrase: string) {
    this.searchTerm.next(phrase);
  }

  getfiveDaysSearchWasMade(): boolean {
    return this.fiveDaysSearchWasMade.value;
  }

  setFiveDaysSearchWasMade(val: boolean): void {
    this.fiveDaysSearchWasMade.next(val);
  }

  getFavorites(): Favorite[] {
    return this.favorites.value;
  }

  setFavorites(args: Favorite[]): void {
    this.favorites.next(args);
  }
}
