import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../service/share-data.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  countryData: any;
  nativeNameFirstKey: any;
  currencyFirstKey: any;
  allLanguages: any;
  constructor(private shareDataService: ShareDataService) {
    this.countryData = this.shareDataService.currentCountry;
    if (!this.countryData) {
      this.countryData = sessionStorage.getItem('current_country');
      this.countryData = JSON.parse(this.countryData);
    }
    if (this.countryData?.name?.nativeName) {
      const keyNativeNameArray = Object.keys(
        this.countryData?.name?.nativeName,
      );
      this.nativeNameFirstKey = keyNativeNameArray
        ? keyNativeNameArray[0]
        : 'NA';
    }
    if (this.countryData?.currencies) {
      const keyCurrenyArray = Object.keys(this.countryData?.currencies);
      this.currencyFirstKey = keyCurrenyArray ? keyCurrenyArray[0] : 'NA';
    }
  }

  ngOnInit(): void {}
}
