import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { EnumToStrPipe } from '../pipes/enum-to-string.pipe';
import { ClientOrder, pizzaImg } from '../../../types/types';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [CommonModule, EnumToStrPipe],
  templateUrl: './order-card.component.html',
})
export class OrderCardComponent {
  @Input() clientOrder!: ClientOrder;
  pizzaImg = pizzaImg;
}
