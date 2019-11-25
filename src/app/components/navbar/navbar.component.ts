import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCelsius: boolean = true;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentFormat.subscribe((tempFormat) => {
      this.isCelsius = tempFormat;
    })
  }

  toggleDark() :void {

  }

  toggleTempMode() :void {
    this.data.setTempFormat();
  }
}
