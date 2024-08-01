import { Dessert } from './dessert.model';

export interface Changes {
  model: Dessert;
  quantity: number;
  total: number | string;
}
