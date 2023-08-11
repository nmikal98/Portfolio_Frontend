import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent {
  searchQuery: string = '';
  countryData: any;

  constructor(private http: HttpClient) {}

  searchCountry() {
    const apiUrl = `https://restcountries.com/v3/name/${this.searchQuery}`;

    this.http.get(apiUrl).subscribe((data: any) => {
      this.countryData = data;

      // console.log(data);
    });
  }
}
