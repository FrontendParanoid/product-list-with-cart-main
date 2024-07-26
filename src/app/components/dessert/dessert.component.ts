import { Component, Input, OnInit } from '@angular/core';
import { Dessert } from '../../models/dessert.model';
import { FormatPrice } from '../../utilities/FormatPrice';

@Component({
  selector: 'app-dessert',
  standalone: true,
  imports: [],
  templateUrl: './dessert.component.html',
  styleUrl: './dessert.component.scss',
})
export class DessertComponent implements OnInit {
  @Input() model!: Dessert;
  formattedPrice: string | null = null;

  constructor() {}

  ngOnInit() {
    this.formattedPrice = FormatPrice(this.model.price);
  }
}
