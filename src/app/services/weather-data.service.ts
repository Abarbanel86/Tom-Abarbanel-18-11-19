import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  newArrMax: number[];
  newArrMin: number[];

  private suggestions = new BehaviorSubject<string[]>([]);
  currentSuggestions = this.suggestions.asObservable();

  private fiveDates = new BehaviorSubject<any[]>([]);
  currentFiveDates = this.fiveDates.asObservable();

  private fiveMin = new BehaviorSubject<number[]>([]);
  currentFiveMin = this.fiveMin.asObservable();

  private fiveMax = new BehaviorSubject<number[]>([]);
  currentFiveMax = this.fiveMax.asObservable();

  private topSearchID = new BehaviorSubject<number>(0);
  currentTopID = this.topSearchID.asObservable();

  private locationName = new BehaviorSubject<string>('');
  currentLocationName = this.locationName.asObservable();
  

  constructor() { }

  getLocationName() {
    return this.locationName.value;
  }

  setLocationName(name: string) {
    this.locationName.next(name);
  }

  setFiveDaysDates(params: any[]) {
    this.fiveDates.next(params);
  }

  getFiveDates() {
    return this.fiveDates.value;
  }

  setFiveMin(params: number[]) {
    this.fiveMin.next(params);
  }

  getFiveMin() {
    return this.fiveMin.value;
  }

  setFiveMax(params: number[]) {
    this.fiveMax.next(params);
  }

  getFiveMax() {
    return this.fiveMax.value;
  }

  setSuggestions(args: string[]) {
    this.suggestions.next(args);
  }

  getSuggetsions() {
    return this.suggestions.value;
  }

  setTopSearchID(id: number) {
    this.topSearchID.next(id);
  }

  getTopSearchID() {
    return this.topSearchID.value;
  }

  handleFormatChange(toCelsius: boolean) {
    var arrMax: number[] = this.getFiveMax();
    var arrMin: number[] = this.getFiveMin();
    this.newArrMax = [];
    this.newArrMin = [];

    if(toCelsius) {
      arrMax.map(element => {
        element = element * 9 / 5 + 32;
        this.newArrMax.push(element);
      });
      arrMin.map(element => {
        element = element * 9 / 5 + 32;
        this.newArrMin.push(element);
      });
      this.setFiveMax(this.newArrMax);
      this.setFiveMin(this.newArrMin);
    } else {
      arrMax.map(element => {
        element = element - 32 * 9 / 5;
        this.newArrMax.push(element);
      });
      arrMin.map(element => {
        element = element - 32 * 9 / 5;
        this.newArrMin.push(element);
      });
      this.setFiveMax(this.newArrMax);
      this.setFiveMin(this.newArrMin);
    }
    //some stupid error can't find it...
  }
}
