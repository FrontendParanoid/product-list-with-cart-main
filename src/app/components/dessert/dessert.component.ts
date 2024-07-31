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
  formattedPrice: string | null = null;
  chosen: boolean = false;
  nbItem: number = 0;

  constructor() {}

  ngOnInit() {
    this.formattedPrice = FormatPrice(this.model.price);
  }

  PickItem() {
    this.chosen = true;
    this.nbItem++;

    const changes: Changes = { model: this.model, quantity: this.nbItem };
    this.itemEvent.emit(changes);
  }

  Increase() {
    this.nbItem++;
    const changes: Changes = { model: this.model, quantity: this.nbItem };
    this.itemEvent.emit(changes);
  }

  Decrease() {
    this.nbItem--;
    const changes: Changes = { model: this.model, quantity: this.nbItem };
    this.itemEvent.emit(changes);

    if (this.nbItem === 0) {
      this.chosen = false;
      return;
    }
  }
}
