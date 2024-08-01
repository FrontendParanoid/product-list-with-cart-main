import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dessert } from '../../models/dessert.model';
import { FormatPrice } from '../../utilities/FormatPrice';
import { CommonModule } from '@angular/common';
import { Changes } from '../../models/changes.model';

@Component({
  selector: 'app-dessert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dessert.component.html',
  styleUrl: './dessert.component.scss',
})
export class DessertComponent implements OnInit {
  @Input() model!: Dessert;
  @Output() itemEvent = new EventEmitter<Changes>();
  @Output() deleteItemEvent = new EventEmitter<string>();
  formattedPrice: string | null = null;
  chosen: boolean = false;
  nbItem: number = 0;

  constructor() {}

  ngOnInit() {
    const price = parseInt(this.model.price);
    this.formattedPrice = FormatPrice(price);
    this.model.price = FormatPrice(price);
  }

  PickItem() {
    this.chosen = true;
    this.nbItem++;

    const changes: Changes = {
      model: this.model,
      quantity: this.nbItem,
      total: parseInt(this.model.price.substring(1)) * this.nbItem,
    };
    this.itemEvent.emit(changes);
  }

  Increase() {
    this.nbItem++;
    const changes: Changes = {
      model: this.model,
      quantity: this.nbItem,
      total: parseInt(this.model.price.substring(1)) * this.nbItem,
    };
    this.itemEvent.emit(changes);
  }

  Decrease() {
    this.nbItem--;
    const changes: Changes = {
      model: this.model,
      quantity: this.nbItem,
      total: parseInt(this.model.price.substring(1)) * this.nbItem,
    };
    this.itemEvent.emit(changes);

    if (this.nbItem === 0) {
      this.chosen = false;
      this.deleteItemEvent.emit(this.model.name);
      return;
    }
  }
}
