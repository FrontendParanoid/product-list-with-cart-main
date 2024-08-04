import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Changes } from '../../models/changes.model';

@Injectable({ providedIn: 'root' })
export class EventDetectionService {
  eventSubject = new Subject<string>();
  orderSubject = new Subject<Changes[]>();
}
