import { Component, Input, OnInit } from '@angular/core';
import { Dessert } from '../../models/dessert.model';
import { FormatPrice } from '../../utilities/FormatPrice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dessert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dessert.component.html',
  styleUrl: './dessert.component.scss',
})
export class DessertComponent implements OnInit {
  @Input() model!: Dessert;
  formattedPrice: string | null = null;
  chosen: boolean = false;
  nbItem: number = 0;

  constructor() {}

  ngOnInit() {
    this.formattedPrice = FormatPrice(this.model.price);
  }

  PickItem() {
    if (this.chosen === false && this.nbItem === 0) {
      this.chosen = true;
      this.nbItem++;
      return;
    }
    if (this.nbItem === 0) {
      this.chosen = false;
      return;
    }
  }

  Increase() {
    this.nbItem++;
    if (this.nbItem === 0) {
      this.PickItem();
    }
  }

  Decrease() {
    this.nbItem--;
    if (this.nbItem === 0) {
      this.PickItem();
    }
  }
}
