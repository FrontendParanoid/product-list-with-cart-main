import { CommonModule } from '@angular/common';
import { Component, model, OnInit } from '@angular/core';
import { DessertComponent } from '../dessert/dessert.component';
import { Dessert } from '../../models/dessert.model';
import { DessertService } from '../../services/dessert.service';
import { CartComponent } from '../cart/cart.component';
import { Changes } from '../../models/changes.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DessertComponent, CartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  desserts: Dessert[] = [];
  changes: Changes[] = [];

  constructor(private dessertService: DessertService) {}

  ngOnInit() {
    this.desserts = this.dessertService.GetDesserts();
  }

  SendToCart(change: Changes) {
    const existingChange = this.changes.findIndex(
      (c) => c.model === change.model
    );
    if (existingChange != -1) {
      this.changes[existingChange].quantity = change.quantity;
    } else {
      this.changes.push(change);
    }
  }
}
