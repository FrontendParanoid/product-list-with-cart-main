import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DessertComponent } from '../dessert/dessert.component';
import { Dessert } from '../../models/dessert.model';
import { DessertService } from '../../services/dessert.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DessertComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  desserts: Dessert[] = [];

  constructor(private dessertService: DessertService) {}

  ngOnInit() {
    this.desserts = this.dessertService.GetDesserts();
  }
}
