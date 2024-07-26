import { Dessert } from '../models/dessert.model';
import data from './data.json';
import { Injectable, OnInit } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DessertService implements OnInit {
  _desserts: Dessert[] = [];

  constructor() {}

  ngOnInit() {
    console.log(this.desserts);
  }

  get desserts() {
    return this._desserts;
  }
  set desserts(value: Dessert[]) {
    this.desserts = value;
  }

  GetDesserts() {
    data.forEach((d) => {
      const model: Dessert = {
        name: d.name,
        price: d.price,
        category: d.category,
        image: {
          thumbnail: d.image.thumbnail,
          mobile: d.image.mobile,
          tablet: d.image.tablet,
          desktop: d.image.desktop,
        },
      };
      this.desserts.push(model);
    });

    console.log(this.desserts);

    return this.desserts;
  }
}
