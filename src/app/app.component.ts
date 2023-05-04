import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { WeatherData } from './models/weather.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}
  currentTemp?: number;
  realFeelTemp?: number;
  Pressure?: number;
  isDay?: number;
  location?: string;
  windSpeed?: number;
  humidity?: number;
  condition?: string;
  weatherData?: WeatherData;
  cityName: string = 'Bhopal';
  ngOnInit(): void {
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }

  onSubmit() {
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }

  private getWeatherData(cityName: string) {
    this.weatherService.getWeatherData(cityName).subscribe({
      next: (response) => {
        this.weatherData = response;
        this.location = this.weatherData.location.name;
        this.condition = this.weatherData.current.condition.text;
        this.currentTemp = this.weatherData.current.temp_c;
        this.realFeelTemp = this.weatherData.current.feelslike_c;
        this.isDay = this.weatherData.current.is_day;
        this.Pressure = this.weatherData.current.pressure_mb;
        this.windSpeed = this.weatherData.current.wind_kph;
        this.humidity = this.weatherData.current.humidity;
        console.log(this.humidity);
      },
    });
  }
}
