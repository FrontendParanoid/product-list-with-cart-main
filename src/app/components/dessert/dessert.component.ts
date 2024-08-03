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

  subscription = new Subscription();

  constructor(private eventDetectionService: EventDetectionService) {}

  ngOnInit() {
    const price = parseInt(this.model.price);
    this.formattedPrice = FormatPrice(price);
    this.model.price = FormatPrice(price);

    this.subscription = this.eventDetectionService.eventSubject.subscribe(
      (name) => {
        console.log('Received!');
        if (this.model.name === name) {
          this.chosen = false;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
