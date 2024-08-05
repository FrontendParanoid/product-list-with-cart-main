import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Dessert } from '../../models/dessert.model';
import { FormatPrice } from '../../utilities/FormatPrice';
import { CommonModule } from '@angular/common';
import { Changes } from '../../models/changes.model';
import { EventDetectionService } from '../../services/Interface/EventDetection.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dessert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dessert.component.html',
  styleUrl: './dessert.component.scss',
})
export class DessertComponent implements OnInit, OnDestroy {
  @Input() model!: Dessert;
  @Output() itemEvent = new EventEmitter<Changes>();
  @Output() deleteItemEvent = new EventEmitter<string>();
  formattedPrice: string | null = null;
  chosen: boolean = false;
  nbItem: number = 0;
  isSelected: boolean = false;

  deleteSubscription = new Subscription();
  orderSubscription = new Subscription();

  constructor(private eventDetectionService: EventDetectionService) {}

  ngOnInit() {
    const price = parseInt(this.model.price);
    this.formattedPrice = FormatPrice(price);
    this.model.price = FormatPrice(price);

    this.deleteSubscription = this.eventDetectionService.eventSubject.subscribe(
      (name) => {
        if (this.model.name === name) {
          this.chosen = false;
          this.isSelected = false;
        }
      }
    );
    this.orderSubscription = this.eventDetectionService.orderSubject.subscribe(
      (changes: Changes[]) => {
        if (changes.find((c) => c.model.name === this.model.name)) {
          this.isSelected = true;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.deleteSubscription.unsubscribe();
    this.orderSubscription.unsubscribe();
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
