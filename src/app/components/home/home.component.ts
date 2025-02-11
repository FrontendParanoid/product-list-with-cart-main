import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  model,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DessertComponent } from '../dessert/dessert.component';
import { Dessert } from '../../models/dessert.model';
import { DessertService } from '../../services/dessert.service';
import { CartComponent } from '../cart/cart.component';
import { Changes } from '../../models/changes.model';
import { FormatPrice } from '../../utilities/FormatPrice';
import { EventDetectionService } from '../../services/Interface/EventDetection.service';
import { Subscription } from 'rxjs';
import { ConfirmOrderComponent } from '../confirm-order/confirm-order.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    DessertComponent,
    CartComponent,
    ConfirmOrderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  desserts: Dessert[] = [];
  changes: Changes[] = [];
  removedItem!: string;
  confirmedOrder: boolean = false;

  temp: string = '';

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
      this.changes[existingChange].total = FormatPrice(change.total);
    } else {
      change.total = FormatPrice(change.total);
      this.changes.push(change);
    }
  }
  RemoveFromCart(name: string) {
    const itemIndex = this.changes.findIndex(
      (item) => item.model.name === name
    );
    if (itemIndex != -1) {
      this.changes.splice(itemIndex, 1);
    }
    this.removedItem = name;
  }

  Reset(res: boolean) {
    this.confirmedOrder = res;
    window.location.reload();
  }
}
