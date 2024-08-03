import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Changes } from '../../models/changes.model';
import { FormatPrice } from '../../utilities/FormatPrice';
import { EventDetectionService } from '../../services/Interface/EventDetection.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  @Input() changes: Changes[] = [];
  constructor(private eventDetectionService: EventDetectionService) {}

  ngOnInit() {}

  CountItems() {
    let total: number = 0;
    this.changes.forEach((change) => {
      total += change.quantity;
    });
    return total;
  }

  CountTotal() {
    let total: number = 0;
    this.changes.forEach((change) => {
      total += parseInt((change.total as string).substring(1));
    });
    return total.toFixed(2);
  }

  RemoveItem(item: Changes) {
    const index = this.changes.findIndex((c) => c === item);
    this.changes.splice(index, 1);
    this.eventDetectionService.eventSubject.next(item.model.name);
  }
}
