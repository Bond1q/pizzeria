import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ApiService } from '../../api-gateway/api.service';
import { OrderCardComponent } from './components/order-card.component';
import { ClientOrder } from '../../types/types';

@UntilDestroy()
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, OrderCardComponent, RouterModule],
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: ClientOrder[] = [];
  interval!: NodeJS.Timeout;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService
      .getClients()
      .pipe(untilDestroyed(this))
      .subscribe((orders) => (this.orders = orders.reverse()));

    this.interval = setInterval(() => {
      this.apiService
        .getClients()
        .pipe(untilDestroyed(this))
        .subscribe((orders) => (this.orders = orders.reverse()));
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
