import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../../data.service';
import { WeatherService } from '../../services/weather.service';
import { environment } from '../../../environments/environment';
import { WeatherDataService } from '../../services/weather-data.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  myControl = new FormControl();
  search: string ="";
  options: string[] = [];
  topID: number;

  constructor(private data: DataService,
    private weather: WeatherService,
    private weatherData: WeatherDataService,
    private searchService: SearchService) { }

  ngOnInit() {
    this.weatherData.currentSuggestions.subscribe((args) => {
      this.options = args;
    });
  }

  onKey(event: any): void {
    if(event.key == 'Backspace') {
      this.options = [];
    }

    if(event.key == 'Enter') {
      this.onSubmit()
    }

    this.search = event.target.value;
    if(event.target.value.length > environment.autoSearchTrashHold) {
      this.searchService.searchByName(this.search);
     }
  }
  
  onSubmit() :void {    
    if(this.search == '') {
      return;
    }
    this.searchService.searchByID();
    this.weatherData.setLocationName(this.search);
  }
}
