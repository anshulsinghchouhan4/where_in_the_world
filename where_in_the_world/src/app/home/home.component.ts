import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareDataService } from '../service/share-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allCountries: any;
  allRegions: any = [];
  searchText: any;
  noFilterData: any;
  constructor(
    private http: HttpClient,
    private shareDataService: ShareDataService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.http
      .get('https://restcountries.com/v3.1/all')
      .subscribe((data: any) => {
        this.allCountries = data.slice(0, 10);
        this.noFilterData = this.allCountries;
        for (let country of this.allCountries) {
          this.allRegions.push(country.region);
        }
      });
  }

  showDetails(data: any) {
    this.shareDataService.currentCountry = data;
    sessionStorage.setItem('current_country', JSON.stringify(data));
    this.router.navigate(['/country']);
  }

  selectedByRegion(event: any) {
    let value = event.target.value;
    if (value == 'no_data') {
      this.allCountries = this.noFilterData;
      return;
    }
    let tempArray = [];
    for (let country of this.noFilterData) {
      if (country.region === value) {
        tempArray.push(country);
      }
    }
    this.allCountries = tempArray;
  }
}
