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
import { Subscription } from 'rxjs';
import { Changes } from '../../models/changes.model';
import { EventDetectionService } from '../../services/Interface/EventDetection.service';
import { CommonModule } from '@angular/common';
import { FormatPrice } from '../../utilities/FormatPrice';

@Component({
  selector: 'app-confirm-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-order.component.html',
  styleUrl: './confirm-order.component.scss',
})
export class ConfirmOrderComponent implements OnInit {
  subscription = new Subscription();
  @Input() items: Changes[] = [];
  @Output() backEvent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  CountTotal() {
    let result: number = 0;
    this.items.forEach((item) => {
      let price = item.total.toString().substring(1);
      result += parseInt(price as string);
    });

    return FormatPrice(result);
  }

  Done() {
    this.backEvent.emit(false);
  }
}
